import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import PropertyCard from "../components/PropertyCard";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const propertyLocation = searchParams.get("propertyLocation");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  const [input, setInput] = useState("");
  const { properties, axios } = useAppContext();

  const isSearchData = propertyLocation && checkInDate && checkOutDate;
  const [filteredProperties, setFilteredProperties] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilteredProperties(properties);
      return null;
    }
    const filtered = properties.slice().filter((property) => {
      return property.address.city.toLowerCase().includes(input.toLowerCase())
      || property.address.state.toLowerCase().includes(input.toLowerCase())
      || property.address.country.toLowerCase().includes(input.toLowerCase())
      || property.property_type.toLowerCase().includes(input.toLowerCase())
      || property.title.toLowerCase().includes(input.toLowerCase());
    })
    setFilteredProperties(filtered);
  };

  const searchProperties = async () => {
    const { data } = await axios.get(
      `/api/properties/search-properties?city=${propertyLocation}`
    );
    if (data.success) {
      setFilteredProperties(data.data);
      if (data.data.length === 0) {
        alert("No properties found for the selected criteria.");
      }
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchProperties();
    }
  }, []);

  useEffect(() => {
    properties.length > 0 && !isSearchData && applyFilter();
  }, [input, properties]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title="Available Suits"
          subTitle="Browse our selection of premium Suits available for your next adventure"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4.5 h-4.5 mr-2 cursor-pointer"
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full h-full outline-none text-gray-500"
            type="text"
            placeholder="Search by location or type..."
          />
          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4.5 h-4.5 ml-2 cursor-pointer"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredProperties.length} Properties
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredProperties.map((property, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              key={index}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Properties;
