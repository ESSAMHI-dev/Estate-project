import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useNotificationStore from "../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav className="h-[100px] flex justify-between items-center relative ">
      <div className="flex flex-3 items-center gap-[50px]">
        <a
          href="/"
          className="flex items-center gap-[10px] font-bold text-[20px] transition-all duration-300 ease-in-out hover:scale-105"
        >
          <img src="/logo.png" alt="" className="w-[70px]" />
          <span className="hidden sm:inline">LuxeLiving</span>
        </a>

        {/* DESKTOP LINKS */}
        <a
          href="/"
          className="transition-all duration-300 ease-in-out hover:scale-105 max-sm:hidden"
        >
          Home
        </a>
        <a
          href="/About"
          className="transition-all duration-300 ease-in-out hover:scale-105 max-sm:hidden"
        >
          About
        </a>
        <a
          href="mailto:Mohammed.amine.Essamhi@ibm.com"
          className="transition-all duration-300 ease-in-out hover:scale-105 max-sm:hidden"
        >
          Contact
        </a>

        <a
          href="/list"
          className="transition-all duration-300 ease-in-out hover:scale-105 max-sm:hidden"
        >
          properties
        </a>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end h-full md:bg-transparent relative gap-2">
        {currentUser ? (
          <div className="flex items-center font-bold">
            <img
              src={currentUser.avatar || "/noavatar.png"}
              alt="user"
              className="w-[40px] h-[40px] rounded-full object-cover mr-[20px] max-sm:hidden"
            />
            <span className="max-sm:hidden mr-3">{currentUser.username}</span>

            <Link
              to="/profile"
              className="relative px-[32px] py-[12px] bg-[#fece51] cursor-pointer rounded-2xl"
            >
              {number > 0 && (
                <div className="absolute -top-[8px] -right-[8px] bg-red-600 text-white rounded-full w-[26px] h-[26px] flex items-center justify-center">
                  {number}
                </div>
              )}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" className="px-[24px] py-[12px] m-[20px]">
              Sign in
            </a>
            <a
              href="/register"
              className="px-[24px] py-[12px] m-[20px] bg-[#fece51]"
            >
              Sign up
            </a>
          </>
        )}
      </div>

      <div className="hidden max-sm:inline z-[999] ml-2">
        <img
          src="/menu.png"
          alt="menu"
          className="w-[40px] h-[40px] cursor-pointer"
          onClick={() => {
            setOpen((prev) => {
              const next = !prev;
              document.body.style.overflow = next ? "hidden" : "auto";
              return next;
            });
          }}
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
    fixed top-0 right-0 h-screen w-full bg-black text-white 
    flex flex-col items-center justify-center text-[24px] space-y-6
    transform transition-transform duration-500 ease-in-out z-[998]
    ${open ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
        {!currentUser && (
          <>
            <a href="/login">Sign in</a>
            <a href="/register">Sign up</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
