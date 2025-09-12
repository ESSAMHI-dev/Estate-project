import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";

function Card({ item }) {
  const navigate = useNavigate();

  const handleChatClick = async () => {
    console.log("Chat button clicked!");
    try {
      const res = await apiRequest.post("/chats", {
        receiverId: item.userId,
      });
      console.log("Chat created:", res.data);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("Error starting chat:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <Link to={`/${item.id}`} className="h-[200px] md:flex-[2]">
        {item.images?.[0] && (
          <img
            src={item.images[0]}
            alt={item.title || "Property"}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </Link>
      <div className="flex flex-col justify-between gap-2.5 md:flex-[3]">
        <h2 className="text-[20px] font-semibold text-[#444] transition-all duration-300 hover:text-black hover:scale-[1.01]">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="text-sm flex items-center gap-1 text-gray-500">
          <img src="/pin.png" alt="" className="w-4 h-4" />
          <span>{item.address}</span>
        </p>
        <p className="text-[20px] font-light px-2 py-1 rounded bg-[rgba(254,205,81,0.438)] w-max">
          $ {item.price}
        </p>
        <div className="flex justify-between gap-2.5">
          <div className="flex gap-5 text-sm">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
              <img src="/bed.png" alt="" className="w-4 h-4" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
              <img src="/bath.png" alt="" className="w-4 h-4" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div
            className="border border-gray-400 px-2 py-1 rounded cursor-pointer flex items-center justify-center hover:bg-gray-300"
            onClick={handleChatClick}
          >
            <img src="/chat.png" alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
