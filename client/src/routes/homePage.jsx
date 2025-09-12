import { useContext } from "react";
import SearchBar from "../components/searchBar/SearchBar";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex h-full">
      {/* LEFT TEXT CONTAINER */}
      <div className="flex-[3]">
        <div className="flex flex-col items-center justify-center gap-12 h-full pr-24 max-lg:pr-12 max-md:p-0 max-sm:justify-start">
          <h1 className="text-6xl max-lg:text-5xl font-bold leading-tight">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p className="text-gray-600">
            Discover a place you'll love to call home. Whether you're searching
            for a modern apartment, a cozy house, or a luxurious high-rise, we
            make it easy to find your perfect fit. Start your journey with us
            and turn your dream space into a reality.
          </p>
          <SearchBar />

          {/* BOXES */}
          <div className="flex justify-between gap-32 max-sm:hidden">
            <div className="text-center">
              <h1 className="text-4xl max-lg:text-3xl font-bold">2+</h1>
              <h2 className="text-xl font-light">Years of Experience</h2>
            </div>
            <div className="text-center">
              <h1 className="text-4xl max-lg:text-3xl font-bold">100+</h1>
              <h2 className="text-xl font-light">Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE CONTAINER */}
      <div className="flex-[2] bg-[#fcf5f3] relative hidden md:flex items-center">
        <img
          src="/bg.png"
          alt=""
          className="absolute right-0 w-[115%] lg:w-[105%]"
        />
      </div>
    </div>
  );
}

export default HomePage;
