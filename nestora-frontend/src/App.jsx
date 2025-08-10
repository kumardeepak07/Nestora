import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import MyBookings from "./pages/MyBookings";
import PropertyDetails from "./pages/PropertyDetails";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddProperty from "./pages/owner/AddProperty";
import ManageProperty from "./pages/owner/ManageProperty";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {showLogin} = useAppContext()
  const isOwnerPath  = useLocation().pathname.startsWith('/owner');
  return (
    <>
    <Toaster />
      {showLogin && <Login />}
      
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="manage-property" element={<ManageProperty />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
      
    </>
  );
}
export default App;