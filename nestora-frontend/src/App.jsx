import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import MyBookings from "./pages/MyBookings";
import PropertyDetails from "./pages/PropertyDetails";

const App = () => {
  const [setShowLogin] = useState(false);
  const isOwnerPath  = useLocation().pathname.startsWith('/owner');
  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property-Details" element={<PropertyDetails />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        {/* Add other routes here */}
      </Routes>
    </>
  );
}
export default App;