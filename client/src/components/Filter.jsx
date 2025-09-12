import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newQuery = {
      ...query,
      [name]: value,
    };
    setQuery(newQuery);
    setSearchParams(newQuery); 
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-light text-2xl">
        Search results for <b>{searchParams.get("city")}</b>
      </h1>

      {/* Top Section */}
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-[10px]">
            Location
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-[10px]">
            Type
          </label>
          <select
            name="type"
            id="type"
            className="w-[100px] p-2.5 border border-gray-300 rounded-md text-sm"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="property" className="text-[10px]">
            Property
          </label>
          <select
            name="property"
            id="property"
            className="w-[100px] p-2.5 border border-gray-300 rounded-md text-sm"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="minPrice" className="text-[10px]">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            className="w-[100px] p-2.5 border border-gray-300 rounded-md text-sm"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="maxPrice" className="text-[10px]">
            Max Price
          </label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            className="w-[100px] p-2.5 border border-gray-300 rounded-md text-sm"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bedroom" className="text-[10px]">
            Bedroom
          </label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            className="w-[100px] p-2.5 border border-gray-300 rounded-md text-sm"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>

        <button
          onClick={handleFilter}
          className="w-[100px] p-2.5 bg-[#fece51] rounded-md flex items-center justify-center"
        >
          <img src="/search.png" alt="search" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
