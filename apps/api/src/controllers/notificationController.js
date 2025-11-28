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
  const created =await Notification.create({ user: userId, ...data });

  pushNotification(userId, created);
};

// store active connections
const clients = {};

export const sseStream = (req, res) => {
  const userId = req.user._id.toString();
  
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
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

  conn.write(`event: message\n`);
  conn.write(`data: ${JSON.stringify(notification)}\n\n`);
};

