import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173", //frontend
    methods: ["GET", "POST"]
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`User connected: ${userId} with socket ${socket.id}`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);

    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent from ${data.senderId} to ${receiverId}`);
    } else {
      console.warn(`Receiver ${receiverId} is not online. Message not sent.`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});

io.listen(4000, () => {
  console.log("Socket server listening on port 4000");
});
