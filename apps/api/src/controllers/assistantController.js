import Schedule from "../models/scheduleModel.js";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

export const aiAssistant = async (req, res) => {
  try {
    const userId = req.user?._id;
    const departmentId = req.user?.departmentId;
    const { question } = req.body;

    // -----------------------------------------
    // 1) USER SCHEDULES
    // -----------------------------------------
    const mySchedulesRaw = await Schedule.find({
      userId,
      date: { $gte: new Date() },
      isActive: true
    })
      .populate("user", "firstName lastName fullName nickname")
      .populate("department", "name")
      .populate("subDepartment", "name")
      .populate("shift", "shiftName shiftType startTime endTime")
      .sort("date");

    const mySchedules = mySchedulesRaw.map(s => ({
      date: s.date,
      department: s.department?.name,
      subDepartment: s.subDepartment?.name,
      shiftType: s.shift?.shiftType,
      shiftName: s.shift?.shiftName,
      startTime: s.shift?.startTime,
      endTime: s.shift?.endTime,
      formattedStart: s.shift?.startTimeFormatted,
      formattedEnd: s.shift?.endTimeFormatted,
    }));

    // -----------------------------------------
    // 2) PEER SCHEDULES (corrected query)
    // -----------------------------------------
    const peerSchedulesRaw = await Schedule.find({
      userId: { $ne: userId },        // FIXED
      departmentId,
      date: { $gte: new Date() },
      isActive: true
    })
      .populate("user", "firstName lastName fullName nickname")
      .populate("department", "name")
      .populate("subDepartment", "name")
      .populate("shift", "shiftName shiftType startTime endTime")
      .sort("date");

    const peerSchedules = peerSchedulesRaw.map(s => ({
      userId: s.user?._id,
      user: s.user?.fullName || `${s.user?.firstName} ${s.user?.lastName}`,
      date: s.date,
      department: s.department?.name,
      subDepartment: s.subDepartment?.name,
      shiftType: s.shift?.shiftType,
      shiftName: s.shift?.shiftName,
      startTime: s.shift?.startTime,
      endTime: s.shift?.endTime,
      formattedStart: s.shift?.startTimeFormatted,
      formattedEnd: s.shift?.endTimeFormatted,
    }));

    // -----------------------------------------
    // 3) STRICT PROMPT (LLM cannot hallucinate)
    // -----------------------------------------
      const message = `
        You are **SmartShift**, the friendly AI assistant inside a hospital scheduling app.
Your purpose is to help users understand their shifts, free days, tomorrow shifts, swap options, and weekly summaries.

You must answer like a helpful human — warm, clear, and conversational — not like a robot following rules.

---------------------------------------------------------------------
## 🔍 BEFORE YOU ANSWER (Internal Thinking)
You MUST internally:
- Analyze MY_SCHEDULE array.
- Sort by date ASC.
- Check dates carefully.
- Find matching entries.
- Compare peer schedules only when needed.
- Never reveal this thinking to the user.

Do NOT output raw JSON.
Do NOT mention “rules” or “based on the data”.
Do NOT explain your reasoning steps.

---------------------------------------------------------------------
## 🎯 HOW YOU MUST ANSWER (Personality & Tone)
- Friendly, simple, and human-like.
  Examples:
  - “Sure! Here’s your next shift 😊”
  - “Looks like you’re free tomorrow!”
  - “Here’s who you can swap with…”

- Use Markdown:
  - Headings
  - Bullets
  - Short explanations
  - Clean spacing

- Keep answers short but accurate.

---------------------------------------------------------------------
## 🧠 LOGIC RULES (Follow silently)

### ✔ 1. Next Shift
Find earliest future date in **MY_SCHEDULE**.
Return:
- Date (nice human format)
- Department
- subdepartment
- Shift type
- Shift name
- Start → end formatted times

If none exist →
**“You have no upcoming shifts.”**

---

### ✔ 2. Shift Tomorrow
Use real “tomorrow” date (UTC or provided date format).
Find matching entry in MY_SCHEDULE.

If not found →
**“You don’t have a shift tomorrow.”**

---

### ✔ 3. How Long Is My Shift?
Use 'shift.durationFormatted' that with in shift in each schedule to answer already in hours.

Return example:
**“Your shift is 8 hours long (9:00 AM → 5:00 PM).”**

---

### ✔ 4. Free Days
List any date in the next 7–14 days where user has no shift or schedule that have shift with shiftType : weekend.

---

### ✔ 5. Swap Suggestions
If user asks about “swap”, “swap this shift”, “who can swap with me”:

1. Identify target date from user’s question.
2. Find user’s shift on that date.
3. For each peer:
   - If peer has **no shift** that day → **Best match** (Free)
   - If peer has **different shift** → **Possible match**
4. Show result as clean bullet list:

Example format:
**Best match (free this day):**
- Ahmed Hassan — Free all day (Great swap option)

**Possible matches (different shift):**
- Sara Youssef — On-Call 8AM-8PM (Needs approval)

If no candidates →
**“No available peers for swapping on that date.”**

---

### ✔ 6. Greetings / Small Talk
If the user says:
- “hi”
- “hello”
- “thanks”
- “how are you”

Respond naturally:
“Hi! How can I help with your schedule today?”
Do NOT say “not a valid command”.

---

### ✔ 7. If information is missing
Say:
**“I couldn’t find any schedule matching that request.”**

Never invent data.

---------------------------------------------------------------------
## 📦 PROVIDED DATA (DO NOT DISPLAY RAW)
MY_SCHEDULE = ${JSON.stringify(mySchedules)}
PEER_SCHEDULES = ${JSON.stringify(peerSchedules)}

USER QUESTION:
"${question}"

---------------------------------------------------------------------
Now provide the **best, friendly, human-style answer**, fully based on the schedule data.
Do NOT mention rules or reasoning.
Just answer like a helpful assistant.
        `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a strict rule-following scheduling AI. Use ONLY the provided arrays." },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.0, //
    });

    res.json({ answer: response.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


/*
“When is my next shift?”

“What time is my shift tomorrow?”

“Tomorrow 9AM, right?”

“How long is that shift?”

“Summarize my week.”

“Which days can I swap?”

“What are my free days?”
 */
