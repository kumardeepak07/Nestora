import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { FaSwimmer } from "react-icons/fa";
import { PiAirplaneLight } from "react-icons/pi";
import { PiHospitalLight } from "react-icons/pi";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { BiFridge } from "react-icons/bi";
import { GiMountainCave } from "react-icons/gi";
import { CiBoxList } from "react-icons/ci";
import { BiFirstAid } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { FaSmoking } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { LuCctv } from "react-icons/lu";
import { IoIosRestaurant } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";

const PropertyDetails = () => {
  const { id } = useParams();
  const propertyId = Number(id);
  const { properties, user, setShowLogin, axios } = useAppContext();
  console.log("Properties in context:", properties); // Debugging line
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;
  const [booking, setBooking] = useState({
    propertyId: propertyId,
    fullName: "",
    email: "",
    mobileNumber: "",
    guests: "",
    checkInDate: "",
    checkOutDate: "",
    mode: "DAILY",
    status: "PENDING",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user !== null) {
        const { data } = await axios.post(
          "/api/bookings/book-property",
          booking
        );
        if (data.success) {
          setBooking({
            propertyId: propertyId,
            fullName: "",
            email: "",
            mobileNumber: "",
            guests: "",
            checkInDate: "",
            checkOutDate: "",
            mode: "DAILY",
            status: "PENDING",
          });
          navigate("/my-bookings");
        } else {
          alert(data.message);
        }
      } else {
        setShowLogin(true);
        toast.error("Please login to book a property");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setProperty(
      properties.find((prop) => prop._id.toString() === id.toString())
    );
    console.log("Selected property:", property); // Debugging line
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, id]);

  return property ? (
    <div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
        >
          <img
            src={assets.arrow_icon}
            alt="arrow"
            className="rotate-180 opacity-65"
          />
          Back to Properties
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.img
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={property.image}
              alt=""
              className="w-full h-auto md:mask-x-to-fuchsia-100
            object-cover rounded-xl mb-6 shadow-md"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <p className="text-gray-50 text-lg">{property.category}</p>
              </div>
              <hr className="border-borderColor my-6" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <IoBedOutline /> {property.room_capacity}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <PiAirplaneLight /> {property.airport_distance} km
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <PiHospitalLight /> {property.hospital_distance} km
                </motion.div>
                {[
                  { icon: assets.location_icon, text: property.address.city },
                ].map(({ icon, text }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    key={text}
                    className="flex flex-col items-center bg-light p-4 rounded-lg"
                  >
                    <img src={icon} alt="" className="h-5 mb-2" />
                    {text}
                  </motion.div>
                ))}
              </div>
              <div>
                <h1 className="text-xl font-medium mb-3">Description</h1>
                <p className="text-gray-500">{property.description}</p>
              </div>
              <div>
                <h1 className="text-xl font-medium mb-3">
                  What this place offers
                </h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li className="flex items-center text-gray-500">
                    <FaWifi className="h-4 mr-2" />
                    Free Wi-Fi
                  </li>
                  <li className="flex items-center text-gray-500">
                    <FaTv className="h-4 mr-2" />
                    Televison
                  </li>
                  <li className="flex items-center text-gray-500">
                    <TbAirConditioning className="h-4 mr-2" />
                    AC
                  </li>
                  <li className="flex items-center text-gray-500">
                    <MdOutlineFreeBreakfast className="h-4 mr-2" />
                    Breakfast
                  </li>
                  <li className="flex items-center text-gray-500">
                    <BiFridge className="h-4 mr-2" />
                    Fridge
                  </li>
                  <li className="flex items-center text-gray-500">
                    <IoIosRestaurant className="h-4 mr-2" />
                    Restaurant
                  </li>
                  <li className="flex items-center text-gray-500">
                    <FaSwimmer className="h-4 mr-2" />
                    Swimming Pool
                  </li>
                  <li className="flex items-center text-gray-500">
                    <GiMountainCave className="h-4 mr-2" />
                    Mountain View
                  </li>
                  <li className="flex items-center text-gray-500">
                    <CiBoxList className="h-4 mr-2" />
                    Wardrobe
                  </li>
                  <li className="flex items-center text-gray-500">
                    <BiFirstAid className="h-4 mr-2" />
                    First Aid Kit
                  </li>
                  <li className="flex items-center text-gray-500">
                    <CgGym className="h-4 mr-2" />
                    Gym
                  </li>
                  <li className="flex items-center text-gray-500">
                    <FaSmoking className="h-4 mr-2" />
                    Smoking Area
                  </li>
                  <li className="flex items-center text-gray-500">
                    <LuCctv className="h-4 mr-2" />
                    CCTV Servilance
                  </li>
                  <li className="flex items-center text-gray-500">
                    <IoKeyOutline className="h-4 mr-2" />
                    Self Check-In
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
          >
            <p className="flex items-center text-2xl text-gray-800 font-semibold">
              {currency} {property.daily_price}
              <h6 className="text-base text-gray-400 ">+ 18% GST </h6>
              <span className="text-base text-gray-400 font-normal">
                {" "}
                per day
              </span>
            </p>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="border border-borderColor px-3 py-2 rounded-lg"
                  required
                  id="fullname"
                  value={booking.fullName}
                  onChange={(e) =>
                    setBooking({ ...booking, fullName: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="border border-borderColor px-3 py-2 rounded-lg"
                  required
                  id="email"
                  value={booking.email}
                  onChange={(e) =>
                    setBooking({ ...booking, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Mobile</label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  className="border border-borderColor px-3 py-2 rounded-lg"
                  required
                  id="mobile"
                  value={booking.mobileNumber}
                  onChange={(e) =>
                    setBooking({ ...booking, mobileNumber: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Guests</label>
                <input
                  type="text"
                  placeholder="Number of guests"
                  className="border border-borderColor px-3 py-2 rounded-lg"
                  required
                  id="guests"
                  value={booking.guests}
                  onChange={(e) =>
                    setBooking({ ...booking, guests: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Check-In Date</label>
              <input
                type="date"
                className="border border-borderColor px-3 py-2 rounded-lg"
                required
                id="pickup-date"
                min={new Date().toISOString().split("T")[0]}
                value={booking.checkInDate}
                onChange={(e) =>
                  setBooking({ ...booking, checkInDate: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="checkOut-Date">Check-Out Date</label>
              <input
                value={booking.checkOutDate}
                onChange={(e) =>
                  setBooking({ ...booking, checkOutDate: e.target.value })
                }
                type="date"
                className="border border-borderColor px-3 py-2 rounded-lg"
                required
                id="return-date"
              />
            </div>
            <button className="cursor-pointer w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl">
              Book Now
            </button>
            <p className="text-center text-sm">
              No credit card required to book
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  ); // Show loader while property data is being fetched
};

export default PropertyDetails;
