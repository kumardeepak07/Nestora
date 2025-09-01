import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { FaSwimmer } from "react-icons/fa";
import { PiAirplaneLight } from "react-icons/pi";
import { PiHospitalLight } from "react-icons/pi";

const PropertyCard = ({ property }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/property-details/${property._id}`);
        scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1
    transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt="Property Image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.isAvaliable && (
          <p className="absolute top-2 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        )}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm ext-white px-3 py-2 rounded-lg">
          <span className="text-sm text-white/80 font-semibold">
            {currency} {property.daily_price}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-center items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">
              {property.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {property.category}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.dinner_icon} alt="" className="h-4 mr-2" />
            <span>Breakfast</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <FaWifi className="h-4 w-4 mr-2" />
            <span>Free Wi-Fi</span>
            
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <IoBedOutline className="h-4 w-4 mr-2" />
            <span>1/2/3 Available</span>
            
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.location_icon} alt="" className="h-4 mr-2" />
            <span>{property.address.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
