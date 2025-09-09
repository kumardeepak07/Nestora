import React from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";

const Hero = () => {
  const [propertyLocation, setPropertyLocation] = useState("");
  const [guests] = useState(1);
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    navigate,
  } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/properties?propertyLocation=${propertyLocation}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-10 flex flex-col items-center justify-center gap-14 bg-light text-center px-4"
    >
      {/* Heading */}

      {/* Search Form */}
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between 
             p-6 rounded-2xl md:rounded-full w-full max-w-4xl bg-white 
             shadow-[0px_8px_20px_rgba(0,0,0,0.1)] gap-4 md:gap-6"
      >
        {/* Destination */}
        <div className="flex flex-col text-left w-full md:w-auto">
          <label className="text-sm font-medium text-gray-600">
            Destination
          </label>
          <select
            required
            value={propertyLocation}
            onChange={(e) => setPropertyLocation(e.target.value)}
            className="bg-transparent text-sm px-2 py-1 focus:outline-none"
          >
            <option value="">Select Destination</option>
            {cityList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Check-In */}
        <div className="flex flex-col text-left w-full md:w-auto">
          <label className="text-sm font-medium text-gray-600">Check-In</label>
          <input
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            type="date"
            id="pickup-date"
            min={new Date().toISOString().split("T")[0]}
            className="bg-transparent text-sm px-2 py-1 focus:outline-none"
            required
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col text-left w-full md:w-auto">
          <label className="text-sm font-medium text-gray-600">Check-Out</label>
          <input
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            type="date"
            id="return-date"
            className="bg-transparent text-sm px-2 py-1 focus:outline-none"
            required
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col text-left w-20">
          <label className="text-sm font-medium text-gray-600">Guests</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="bg-transparent text-sm px-2 py-1 focus:outline-none w-14"
            required
          />
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-6 py-3 
               bg-primary hover:bg-primary-dull text-white 
               rounded-full text-sm font-medium cursor-pointer"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 brightness-300"
          />
          Search
        </motion.button>
      </motion.form>
      <div className="text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight 
                   text-gray-900 font-['Playfair_Display'] inline-block"
        >
          Affordable <span className="text-primary">Luxury</span> on Rent
          <div className="w-28 h-1 bg-primary mt-3 mx-auto rounded-full"></div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-4 text-sm md:text-base text-gray-600 font-light"
        >
          Discover premium homes, apartments, and villas — all at affordable
          prices.
        </motion.p>
      </div>

      {/* Hero Image */}
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_property}
        alt="car"
        className="max-h-72 object-contain"
      />
    </motion.div>
  );
};

export default Hero;
