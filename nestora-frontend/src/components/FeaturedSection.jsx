import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import PropertyCard from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";


const FeaturedSection = () => {
  const navigate = useNavigate();

  const { properties } = useAppContext();
  
  return (
    <motion.div
      initial={{ opacity: 1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.2 }}
      >
        <Title
          title="Luxe Properties"
          subTitle="Explore our selection of premium properties available for your next stay"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {properties.length === 0 ? (
          <p>Server Restarted. Please refresh the page after sometimes</p>
        ) : (
          properties.slice(0, 6).map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))
        )}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onClick={() => {
          navigate("/properties");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        Explore all properties <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  );
};

export default FeaturedSection;
