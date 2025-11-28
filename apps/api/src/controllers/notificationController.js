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
  await Notification.create({ user: userId, ...data });
};

// controllers/notificationController.js

// store active connections
const clients = {};

export const sseStream = (req, res) => {
  const userId = req.query.userId;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // save connection
  clients[userId] = res;

  console.log("SSE connected:", userId);

  // when client disconnects
  req.on("close", () => {
    delete clients[userId];
    console.log("SSE disconnected:", userId);
  });
};

// Send events to user (called from any controller)
export const pushNotification = (userId, notification) => {
  if (clients[userId]) {
    clients[userId].write(`data: ${JSON.stringify(notification)}\n\n`);
  }
};

