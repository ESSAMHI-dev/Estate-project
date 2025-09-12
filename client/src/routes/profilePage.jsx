import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import List from "../components/List";
import apiRequest from "../lib/apiRequest";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full max-md:flex-col max-md:overflow-scroll">
      <div className="flex-[3] overflow-y-scroll pb-[50px] max-md:flex-none max-md:h-max">
        <div className="flex flex-col gap-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="font-light">User Information</h1>
            <Link to={"/profile/update"}>
              <button className="px-6 py-3 bg-[#fece51] cursor-pointer border-none rounded-2xl">
                Update Profile
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <span className="flex items-center gap-5">
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button
              onClick={handleLogout}
              className="p-2 w-24 rounded-xl bg-teal-600 text-white font-bold cursor-pointer disabled:cursor-not-allowed"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-light">My List</h1>
            <Link to={"/add"}>
              <button className="px-6 py-3 bg-[#fece51] cursor-pointer border-none rounded-2xl">
                Create New Post
              </button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="flex items-center justify-between">
            <h1 className="font-light">Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="flex-[2] bg-[#fcf5f3] h-full max-md:flex-none max-md:h-max">
        <div className="h-full px-5">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats = {chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
