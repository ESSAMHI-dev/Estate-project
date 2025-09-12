import { useContext } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  return (
    <div className="h-screen max-w-[1366px] max-lg:max-w-[1280px] max-md:max-w-[768px] max-sm:max-w-[640px] mx-auto px-[20px] flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="h-[calc(100vh-100px)] mt-9">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="h-screen max-w-[1366px] max-lg:max-w-[1280px] max-md:max-w-[768px] max-sm:max-w-[640px] mx-auto px-[20px] flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="h-[calc(100vh-100px)] mt-9">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
