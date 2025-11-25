import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: String,
    message: String,
    type: String, // "Schedule", "Swap", "Announcement", etc.
    priority: {
      type: String,
      default: "Low"
    }, // High, Medium, Low
    read: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model("Notification", notificationSchema);
