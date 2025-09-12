import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";
import useNotificationStore from "../lib/notificationStore";

function Chat() {
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  // Fetch chats on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await apiRequest.get("/chats");
        console.log("Chats fetched:", res.data);

        const derivedChats = await Promise.all(res.data.map(async (c) => {
          const receiverId = c.userIDs.find((id) => id !== currentUser.id);
          let receiverData = { id: receiverId, username: "Unknown", avatar: "/noavatar.jpg" };

          try {
            const userRes = await apiRequest.get(`/users/search/${receiverId}`);
            receiverData = userRes.data;
          } catch (err) {
            console.warn("Could not fetch user info for:", receiverId);
          }

          return {
            ...c,
            receiver: receiverData,
            lastMessage: c.messages?.[c.messages.length - 1]?.text,
          };
        }));

        setChats(derivedChats);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, [currentUser.id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) decrease();

      setChat({ ...res.data, receiver });
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text || !chat) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });

      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));

      e.target.reset();

      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    const readChat = async () => {
      if (!chat) return;
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log("Error marking chat as read:", err);
      }
    };

    if (chat && socket) {
      const handleMessage = (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          readChat();
        }
      };

      socket.on("getMessage", handleMessage);

      return () => socket.off("getMessage", handleMessage);
    }
  }, [chat, socket]);

  return (
    <div className="h-screen flex flex-col">
      {/* Chat List */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-scroll p-4 scrollbar-hide">
        <h1 className="font-light text-xl">Messages</h1>
        {chats.map((c) => (
          <div
            key={c.id}
            className="message cursor-pointer flex items-center gap-4 p-4 rounded shadow-sm transition hover:bg-yellow-100"
            style={{
              backgroundColor:
                c.seenBy?.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img
              src={c.receiver.avatar || "/noavatar.jpg"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="font-medium">{c.receiver?.username}</span>
              <p className="text-sm text-gray-600">{c.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      {chat && (
        <div className="bg-white flex flex-col justify-between max-sm:w-full max-sm:h-full w-full h-full">
          {/* Header */}
          <div className="bg-[#f7c14b85] p-5 font-bold flex justify-between items-center">
            <div className="flex items-center gap-5">
              <img
                src={chat.receiver.avatar || "/noavatar.png"}
                alt="user"
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              {chat.receiver.username}
            </div>
            <span className="cursor-pointer" onClick={() => setChat(null)}>
              X
            </span>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-scroll p-5 flex flex-col gap-5 scrollbar-hide">
            {chat.messages?.map((msg) => (
              <div
                key={msg.id}
                className="w-1/2"
                style={{
                  alignSelf: msg.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: msg.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{msg.text}</p>
                <span className="text-[12px] bg-[#f7c14b39] px-1 rounded">
                  {format(msg.createdAt)}
                </span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-2 border-[#f7c14b85] h-[60px] flex items-center justify-between"
          >
            <textarea
              name="text"
              className="flex-[3] h-full border-none p-5 resize-none outline-none"
              placeholder="Type a message..."
            />
            <button className="flex-1 bg-[#f7c14b85] h-full cursor-pointer">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
