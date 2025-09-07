import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import MultiSelect from "../../components/MultiSelect";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const options = [
  { value: 0, label: "1/2/3/4/5 Bedrooms" },
  { value: 1, label: "1BHK" },
  { value: 2, label: "2BHK" },
  { value: 3, label: "3BHK" },
  { value: 4, label: "4BHK" },
  { value: 5, label: "5BHK" },
];
const AddProperty = () => {
  const { axios, currency } = useAppContext();

  const [optionSelected, setSelected] = useState();
  const handleChange = (selected) => {
    setSelected(selected);
    let rooms_capacity = selected.map((item) => item.label).join(",");
    setProperty({ ...property, room_capacity: rooms_capacity });
  };

  const [image, setImage] = useState(null);
  const [property, setProperty] = useState({
    title: "",
    description: "",
    property_type: "",
    daily_price: "",
    monthly_price: "",
    category: "",
    total_rooms_available: "",
    room_capacity: "",
    swimmingPoolAvailable: false,
    gymAvailable: false,
    parkingAvailable: false,
    hospital_distance: "",
    airport_distance: "",
    available: true,
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return null;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "property",
        new Blob([JSON.stringify(property)], { type: "application/json" })
      );

      const { data } = await axios.post("/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setSelected(null);
        setProperty({
          title: "",
          description: "",
          property_type: "",
          daily_price: "",
          monthly_price: "",
          category: "",
          total_rooms_available: "",
          room_capacity: "",
          swimmingPoolAvailable: false,
          gymAvailable: false,
          parkingAvailable: false,
          hospital_distance: "",
          airport_distance: "",
          available: true,
          address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
          },
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="px-4 py-10 md:px-10 flex-1"
    >
      <Title
        title="Add New Property"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specification"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
          <p className="text-sm text-gray-500">
            Upload a picture of your Property
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Title</label>
            <input
              type="text"
              placeholder="title"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.title}
              onChange={(e) =>
                setProperty({ ...property, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Property Type</label>
            <select
              onChange={(e) =>
                setProperty({ ...property, property_type: e.target.value })
              }
              value={property.property_type}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select Property Type</option>
              <option value="VILLA">Furnished</option>
              <option value="RESORT">Semi-Furnished</option>
              <option value="HOTEL">Not Furnished</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="1000"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.daily_price}
              onChange={(e) =>
                setProperty({ ...property, daily_price: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Monthly Price ({currency})</label>
            <input
              type="number"
              placeholder="1000"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.monthly_price}
              onChange={(e) =>
                setProperty({ ...property, monthly_price: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) =>
                setProperty({ ...property, category: e.target.value })
              }
              value={property.category}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a category</option>
              <option value="VILLA">VILLA</option>
              <option value="RESORT">RESORT</option>
              <option value="HOTEL">HOTEL</option>
              <option value="HOSTEL">HOSTEL</option>
              <option value="LODGE">LODGE</option>
              <option value="APARTMENT">APARTMENT</option>
              <option value="PG">PG</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Is Swimming Pool Available?</label>
            <select
              onChange={(e) =>
                setProperty({
                  ...property,
                  swimmingPoolAvailable: e.target.value === "true", // convert string to boolean
                })
              }
              value={property.swimmingPoolAvailable ? "true" : "false"} // map boolean back to string
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">--Select--</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Is Gym Available?</label>
            <select
              onChange={(e) =>
                setProperty({
                  ...property,
                  gymAvailable: e.target.value === "true", // convert string to boolean
                })
              }
              value={property.gymAvailable ? "true" : "false"} // map boolean back to string
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">--Select--</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Is Parking Available?</label>
            <select
              onChange={(e) =>
                setProperty({
                  ...property,
                  parkingAvailable: e.target.value === "true", // convert string to boolean
                })
              }
              value={property.parkingAvailable ? "true" : "false"} // map boolean back to string
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">--Select--</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Hospital Distance</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.hospital_distance}
              onChange={(e) =>
                setProperty({ ...property, hospital_distance: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Airport Distance</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.airport_distance}
              onChange={(e) =>
                setProperty({ ...property, airport_distance: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Total Rooms Available</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.total_rooms_available}
              onChange={(e) =>
                setProperty({
                  ...property,
                  total_rooms_available: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Capacity</label>
            <MultiSelect
              key="rooms_type"
              options={options}
              onChange={handleChange}
              value={optionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Address</label>
            <input
              type="text"
              placeholder="Street/Lane/Area/Locality"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={property.address.street}
              onChange={(e) =>
                setProperty({
                  ...property,
                  address: { ...property.address, street: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>City</label>
            <select
              onChange={(e) =>
                setProperty({
                  ...property,
                  address: { ...property.address, city: e.target.value },
                })
              }
              value={property.address.city}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>State</label>
            <select
              onChange={(e) =>
                setProperty({
                  ...property,
                  address: { ...property.address, state: e.target.value },
                })
              }
              value={property.address.state}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Lakshadweep">Lakshadweep</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Pincode</label>
            <input
              onChange={(e) =>
                setProperty({
                  ...property,
                  address: { ...property.address, pincode: e.target.value },
                })
              }
              value={property.address.pincode}
              type="number"
              placeholder="800020"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Country</label>
            <select
              onChange={(e) =>
                setProperty({
                  ...property,
                  address: { ...property.address, country: e.target.value },
                })
              }
              value={property.address.country}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">--Country--</option>
              <option value="India">India</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious Villa"
            required
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={property.description}
            onChange={(e) =>
              setProperty({ ...property, description: e.target.value })
            }
          ></textarea>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing..." : "List your Property"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddProperty;
