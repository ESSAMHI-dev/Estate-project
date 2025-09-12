import Slider from "../components/slider/Slider";
import Map from "../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 px-4 md:px-8 py-6">
      <div className="flex-1 md:flex-[3]">
        <Slider images={post.images} />

        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-normal">{post.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <img src="/pin.png" alt="" className="w-4 h-4" />
                <span>{post.address}</span>
              </div>
              <div className="px-2 py-1 bg-yellow-200/50 rounded text-xl font-light w-max">
                ${post.price}
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-4 sm:px-12 bg-yellow-200/20 rounded-lg font-semibold">
              <img
                src={post.user.avatar}
                alt="user avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>{post.user.username}</span>
            </div>
          </div>

          {/* Description */}
          <div
            className="mt-12 text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDetail.desc),
            }}
          />
        </div>
      </div>

      {/* Right - Features */}
      <div className="flex-1 md:flex-[2] bg-[#fcf5f3] rounded-lg p-5 md:p-6 flex flex-col gap-8">
        {/* General */}
        <div>
          <p className="font-bold text-lg mb-4">General</p>
          <div className="flex flex-col gap-6 bg-white p-5 rounded-lg">
            <FeatureItem
              icon="/utility.png"
              title="Utilities"
              desc={
                post.postDetail.utilities === "owner"
                  ? "Owner is responsible"
                  : "Tenant is responsible"
              }
            />
            <FeatureItem
              icon="/pet.png"
              title="Pet Policy"
              desc={
                post.postDetail.pet === "allowed"
                  ? "Pets Allowed"
                  : "Pets not Allowed"
              }
            />
            <FeatureItem
              icon="/fee.png"
              title="Income Policy"
              desc={post.postDetail.income}
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="font-bold text-lg mb-4">Sizes</p>
          <div className="flex justify-between text-sm gap-2 max-sm:flex-col">
            <SizeItem icon="/size.png" label={`${post.postDetail.size} m²`} />
            <SizeItem icon="/bed.png" label={`${post.bedroom} beds`} />
            <SizeItem icon="/bath.png" label={`${post.bathroom} bathroom`} />
          </div>
        </div>

        {/* Nearby */}
        <div>
          <p className="font-bold text-lg mb-4">Nearby Places</p>
          <div className="flex justify-between bg-white p-4 rounded-lg max-sm:flex-col max-sm:space-y-2">
            <FeatureItem
              icon="/school.png"
              title="School"
              desc={`${
                post.postDetail.school > 999
                  ? post.postDetail.school / 1000 + " km"
                  : post.postDetail.school + " m"
              } away`}
            />
            <FeatureItem
              icon="/pet.png"
              title="Bus Stop"
              desc={`${post.postDetail.bus} km away`}
            />
            <FeatureItem
              icon="/fee.png"
              title="Restaurant"
              desc={`${post.postDetail.restaurant} km away`}
            />
          </div>
        </div>

        {/* Map */}
        <div>
          <p className="font-bold text-lg mb-4">Location</p>
          <div className="w-full h-[200px] rounded-lg overflow-hidden">
            <Map items={[post]} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSave}
            className={`flex items-center justify-center gap-2 border border-yellow-400 px-5 py-3 rounded-md ${
              saved ? "bg-yellow-400" : "bg-white"
            }`}
          >
            <img src="/save.png" alt="" className="w-4 h-4" />
            {saved ? "Place Saved" : "Save the Place"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3">
      <img src={icon} alt={title} className="w-6 h-6 bg-yellow-200/20" />
      <div>
        <span className="font-semibold block">{title}</span>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
}

function SizeItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md">
      <img src={icon} alt={label} className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
}

export default SinglePage;
