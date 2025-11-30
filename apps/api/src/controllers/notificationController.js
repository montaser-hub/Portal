import Notification from "../models/notificationModle.js";

export const getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req?.user._id })
    .sort({ createdAt: -1 });
  return res.status(200).json({notifications});
};

export const markAllAsRead = async (req, res) => {
  await Notification.updateMany(
    { user: req?.user._id, read: false },
    { $set: { read: true } }
  );
  return res.status( 200 ).json({ message: "Marked all as read" });
};

export const sendNotification = async (userId, data) => {
  // Fire & forget – this never blocks your API
  Notification.create({ user: userId, ...data })
    .then((created) => pushNotification(userId, created))
    .catch((err) => console.error("Notification error:", err));
};

// store active connections
const clients = {};

export const sseStream = (req, res) => {
  const userId = req.user._id.toString();

  const allowedOrigins = ['http://localhost:3001'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
}

  res.setHeader("Content-Type", "text/event-stream", "charset=utf-8");
  res.setHeader("Cache-Control", "no-cache", "no-transform");
  res.setHeader( "Connection", "keep-alive" );
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  // save connection
  clients[userId] = res;

  console.log("SSE connected:", userId);

  // keep-alive ping every 25s (IMPORTANT)
  const keepAlive = setInterval(() => {
    res.write("data: ping\n\n");
  }, 25000 );

  // when client disconnects
  req.on( "close", () => {
    clearInterval(keepAlive);
    delete clients[userId];
    console.log("SSE disconnected:", userId);
  });
};

// Send event to a specific user
export const pushNotification = (userId, notification) => {
  const conn = clients[userId];
  if (!conn) return;

  try {
    conn.write(`event: message\n`);
    conn.write(`data: ${JSON.stringify(notification)}\n\n`);
  } catch (err) {
    console.error("SSE connection lost:", userId);
    delete clients[userId];
  }
};


