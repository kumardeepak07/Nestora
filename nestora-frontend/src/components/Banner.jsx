import React from "react";
import { assets } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Banner = () => {
  const navigate = useNavigate();
  const { isOwner, axios, setIsOwner, user, setShowLogin } = useAppContext();
  const changeRole = async () => {
    try {
      if(user){
        const { data } = await axios.put("/api/user/change-role", {
        role: "OWNER",
        });
        if (data.success) {
          setIsOwner(true);
          navigate("/owner")
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }else{
        setShowLogin(true);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-start items-center
    justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#FF0266] to-[#FCE4EC] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <div className="text-white">
        <h2 className="text-3xl font-medium">Do you Own a Luxury Villa?</h2>
        <p className="mt-2">
          Monetize your property effortlessly by listing it on Nestora
        </p>
        <p className="max-w-130">
          We take care of maintaince, renovation and secure payments -
          so you can earn passive income, stress-free
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all
        text-black rounded-lg text-sm mt-4 cursor-pointer"
        onClick={() => (isOwner ? navigate("/owner") : changeRole())}
        >
          List your property
        </motion.button>
      </div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_property_image}
        alt="car"
        className="max-h-55"
      />
    </motion.div>
  );
};

export default Banner;
