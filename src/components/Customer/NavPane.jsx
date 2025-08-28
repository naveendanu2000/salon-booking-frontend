import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavPane = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState("dashboard");

  useEffect(() => {
    localStorage.getItem("jwt") ? null : navigate("/login");
  }, [navigate]);

  return (
    <div className="max-w-3xs w-[15rem] px-5">
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/customer/dashboard");
          setNav("dashboard");
        }}
      >
        Dashboard
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/customer/booking");
        }}
      >
        Booking
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/customer/transaction");
        }}
      >
        Transaction
      </div>
      <div
        className={`${nav === "" ? "" : null} py-2 mx-10 my-2 cursor-pointer`}
        onClick={() => {
          navigate("/customer/notification");
        }}
      >
        Notification
      </div>
      <hr></hr>
      <div
        className="py-2 mx-10 my-2 cursor-pointer"
        onClick={() => {
          navigate("/customer/account");
        }}
      >
        Account
      </div>
      <div
        className="py-2 mx-10 my-2 cursor-pointer"
        onClick={() => {
          navigate('/logout')
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default NavPane;
