import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../lib/apiRequest";
import UploadWidget from "../components/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* FORM CONTAINER */}
      <div className="w-full lg:flex-[3] overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Post</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between gap-5"
        >
          {/* Basic fields */}
          {[
            { id: "title", label: "Title", type: "text" },
            { id: "price", label: "Price", type: "number" },
            { id: "address", label: "Address", type: "text" },
          ].map((field) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[30%]"
            >
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
              />
            </div>
          ))}

          {/* Description */}
          <div className="flex flex-col gap-2 w-full h-[320px]">
            <label htmlFor="desc" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="h-[200px] text-base rounded-md"
            />
          </div>

          {/* More fields */}
          {[
            { id: "city", label: "City", type: "text" },
            { id: "bedroom", label: "Bedroom Number", type: "number", min: 1 },
            { id: "bathroom", label: "Bathroom Number", type: "number", min: 1 },
            { id: "latitude", label: "Latitude", type: "text" },
            { id: "longitude", label: "Longitude", type: "text" },
          ].map((field) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[30%]"
            >
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                min={field.min}
                className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
              />
            </div>
          ))}

          {/* Select dropdowns */}
          {[
            { id: "type", label: "Type", options: ["Rent", "Buy"] },
            {
              id: "property",
              label: "Property",
              options: ["Apartment", "House", "Condo", "Land"],
            },
            {
              id: "utilities",
              label: "Utilities Policy",
              options: [
                "Owner is responsible",
                "Tenant is responsible",
                "Shared",
              ],
            },
            { id: "pet", label: "Pet Policy", options: ["Allowed", "Not Allowed"] },
          ].map((field) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[30%]"
            >
              <label className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <select
                name={field.id}
                className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Income Policy */}
          <div className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[30%]">
            <label className="text-sm font-medium text-gray-700">
              Income Policy
            </label>
            <input
              id="income"
              name="income"
              type="text"
              placeholder="Income Policy"
              className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
            />
          </div>

          {/* Numbers */}
          {[
            { id: "size", label: "Total Size (m²)", type: "number" },
            { id: "school", label: "School (How Far in m)", type: "number" },
            { id: "bus", label: "Bus (How Far in m)", type: "number" },
            { id: "restaurant", label: "Restaurant (How Far in m)", type: "number" }, 
          ].map((field) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[30%]"
            >
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                min={0}
                className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
              />
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            className="w-full sm:w-[48%] lg:w-[30%] p-4 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-500 transition"
          >
            Add
          </button>
          {error && <span className="text-red-500">{error}</span>}
        </form>
      </div>

      {/* IMAGE UPLOAD SECTION */}
      <div className="w-full lg:flex-[2] bg-[#fcf5f3] flex flex-col gap-5 items-center justify-start p-6">
        <div className="w-full max-h-[400px] overflow-y-auto flex flex-col max-sm:flex-row max-sm:max-h-28 gap-4 items-center">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              alt=""
              className="w-3/4 sm:w-1/2 h-[180px] object-cover rounded-md"
            />
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dbcytpesf",
            uploadPreset: "Real Estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
