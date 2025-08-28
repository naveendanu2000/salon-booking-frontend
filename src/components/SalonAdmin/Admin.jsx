import NavPane from "./NavPane";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";

import Dashboard from "./AdminPages/Dashboard";
import Payment from "./AdminPages/Payment";
import Notification from "./AdminPages/Notification";
import Services from "./AdminPages/Services";
import Transaction from "./AdminPages/Transaction";
import Category from "./AdminPages/Category";
import Booking from "./AdminPages/Booking";
import AddServices from "./AdminPages/AddServices";
import AdminAccount from "./AdminPages/AdminAccount";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const role = localStorage.getItem("role");
      if (role === "CUSTOMER") navigate("/login");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-column">
      <div className="">
        <NavPane />
      </div>
      <div className="p-5 grow">
        <Outlet />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notification" element={<Notification />} />
          <Route path="payment" element={<Payment />} />
          <Route path="services" element={<Services />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="category" element={<Category />} />
          <Route path="booking" element={<Booking />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="addservices" element={<AddServices />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
