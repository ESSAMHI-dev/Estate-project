import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full max-sm:flex-col max-sm:flex max-sm:items-center max-sm:justify-center">
      <div className="flex">
        {types.map((type, index) => (
          <button
            key={type}
            type="button"
            onClick={() => switchType(type)}
            className={`px-9 py-4 border border-gray-400 border-b-0 capitalize cursor-pointer
            ${
              query.type === type
                ? "bg-black text-white"
                : "bg-white text-black"
            }
            ${index === 0 ? "rounded-tl-md border-r-0" : ""}
            ${index === types.length - 1 ? "rounded-tr-md border-l-0" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="flex justify-between h-16 gap-1 border border-gray-400 max-sm:flex-col max-sm:border-0">
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-[200px] px-2 border-0 max-lg:px-1 max-lg:[&:nth-child(2)]:w-[140px] max-lg:[&:nth-child(3)]:w-[140px] max-md:w-[200px] max-md:[&:nth-child(2)]:w-[200px] max-md:[&:nth-child(3)]:w-[200px] max-sm:[&:nth-child(3)]:w-[200px] max-sm:p-5 max-sm:border max-sm:border-gray-400"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
          className="w-[200px] px-2 border-0 max-lg:px-1 max-lg:[&:nth-child(2)]:w-[140px] max-lg:[&:nth-child(3)]:w-[140px] max-md:w-[200px] max-md:[&:nth-child(2)]:w-[200px] max-md:[&:nth-child(3)]:w-[200px] max-sm:w-auto max-sm:p-5 max-sm:border max-sm:border-gray-400"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
          className="w-[200px] px-2 border-0 max-lg:px-1 max-lg:[&:nth-child(2)]:w-[140px] max-lg:[&:nth-child(3)]:w-[140px] max-md:w-[200px] max-md:[&:nth-child(2)]:w-[200px] max-md:[&:nth-child(3)]:w-[200px] max-sm:w-auto max-sm:p-5 max-sm:border max-sm:border-gray-400"
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          className="flex flex-1 items-center justify-center bg-[#fece51]"
        >
          <button type="button" className="bg-[#fece51] max-sm:p-2 ">
            <img src="/search.png" alt="" className="w-6 h-6" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
