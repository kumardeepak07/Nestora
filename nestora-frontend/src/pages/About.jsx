import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const About = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row items-start justify-center gap-12 px-6 md:px-12 py-20 bg-light relative"
    >
      {/* Left: Text (scrolls with page) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="max-w-lg w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          What We Do
        </h2>
        <div className="w-20 h-1 bg-primary rounded-full mx-auto md:mx-0"></div>

        <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base">
          StayNestora helps you find and rent premium properties — from
          luxurious villas to modern apartments — all at affordable prices.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
          Our curated collection ensures comfort, elegance, and convenience so
          you can focus on enjoying your stay, not worrying about the details.
        </p>

        {/* Extra content toggle */}
        {expanded && (
          <>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Whether you’re planning a vacation, business trip, or long-term
              stay, we’ve got a place that feels like home. Each property is
              verified for quality, safety, and modern amenities.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Our goal is to make luxury stays accessible, hassle-free, and
              unforgettable. With StayNestora, every trip feels like a retreat.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Over the years, we have partnered with many leading brands from
              the aviation & hospitality industries, creating fruitful partner
              relations for business expansion opportunities. We also entered
              the homestays & villas and continue to procure increased market
              share market in the same. With this, we also entered the ground
              transport space and commenced offering cab, bus & train booking
              services.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              What makes our story even stronger is the performance of our newly
              launched segments, like myDestination—our comprehensive business
              travel suite and myTraveller—an exclusive platform for travel
              agents. Entering the Mountains market is our latest feat, where we
              offer power-packed deals on flights & hotels.
            </p>
          </>
        )}

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setExpanded(!expanded)}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-full text-sm md:text-base font-medium shadow-lg hover:bg-primary-dull transition"
        >
          {expanded ? "Read Less ↑" : "Read More →"}
        </motion.button>
      </motion.div>

      {/* Right: Sticky Image */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative w-full md:w-1/2 max-w-xl"
      >
        <div className="sticky top-20">
          <img
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            src={assets.travelling}
            alt="Luxury villa"
          />
          {/* Overlay card */}
          <div className="flex items-center gap-2 max-w-72 absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <div className="flex -space-x-3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="guest"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="guest"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200"
                alt="guest"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <div className="flex items-center justify-center text-xs text-white w-9 h-9 rounded-full border-2 border-white bg-primary">
                10K+
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700">
              Join our traveller's community
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
