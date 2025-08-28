import { useEffect } from "react";
import NavPane from "../Customer/NavPane";
import Dashboard from "./CustomerPages/Dashboard";
import Notification from "./CustomerPages/Notification";
import Booking from "./CustomerPages/Booking";
import Transaction from "./CustomerPages/Transaction";
import { Outlet, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CustomerAccount from "./CustomerPages/CustomerAccount";

const Customer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const role = localStorage.getItem("role");
      if (role === "OWNER") navigate("/admin");
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
          <Route path="booking" element={<Booking />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="account" element={<CustomerAccount />} />
          {/* 
          <Route path="payment" element={<Payment />} />
          <Route path="services" element={<Services />} />
          <Route path="category" element={<Category />} />
          <Route path="addservices" element={<AddServices />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Customer;
