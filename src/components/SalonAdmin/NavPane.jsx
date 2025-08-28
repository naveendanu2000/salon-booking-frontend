import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavPane = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState("dashboard");

  return (
    <div className="max-w-3xs w-[15rem] px-5">
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/dashboard");
          setNav("dashboard");
        }}
      >
        Dashboard
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/booking");
        }}
      >
        Booking
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/services");
        }}
      >
        Services
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/addservices");
        }}
      >
        Add Services
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/payment");
        }}
      >
        Payment
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/transaction");
        }}
      >
        Transaction
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/category");
        }}
      >
        Category
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/admin/notification");
        }}
      >
        Notification
      </div>
      <hr></hr>
      <div
        className="py-2 mx-10 my-2 cursor-pointer"
        onClick={() => {
          navigate("/admin/account");
        }}
      >
        Account
      </div>
      <div
        className="py-2 mx-10 my-2 cursor-pointer"
        onClick={() => {
          navigate("/logout");
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default NavPane;
