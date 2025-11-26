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
