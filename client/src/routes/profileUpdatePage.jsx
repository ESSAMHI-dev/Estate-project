import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../components/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar:avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="h-full flex">
      {/* FORM CONTAINER */}
      <div className="flex-[3] flex items-center justify-center">
        <form
          className="flex flex-col gap-5 w-full max-w-md p-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Update Profile
          </h1>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
              defaultValue={currentUser.username}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
              defaultValue={currentUser.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            className="p-4 rounded-md bg-teal-600 text-white font-bold cursor-pointer hover:bg-teal-500 transition"
          >
            Update
          </button>
          {error && <span>error</span>}
        </form>
      </div>

      {/* SIDE CONTAINER */}
      <div className="flex-[2] bg-[#fcf5f3] flex flex-col gap-5 items-center justify-center p-6">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="w-1/2 object-cover rounded-md"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dbcytpesf",
            uploadPreset: "Real Estate",
            multiple: false,
            maxImageFileSize: 4000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
