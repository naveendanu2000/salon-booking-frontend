/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "./smaller_components/Button";
import { useEffect, useState } from "react";
import { getSalonData } from "../redux_logic/actionCreators/getSalonData";

import { getCustomerNotifications } from "../redux_logic/actionCreators/getCustomerNotifications";
import getSalonNotifcations from "../redux_logic/actionCreators/getSalonNotifcations";

const LoginSuccess = ({ fullName }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  let narray = [];
  const [allRead, setAllRead] = useState(true);
  const dispatch = useDispatch();

  const [salonData, setSalonData] = useState({});

  useEffect(() => {
    const fetchSalonData = async () => {
      const sData = await dispatch(getSalonData());

      console.log(sData);
      setSalonData(sData);
    };

    fetchSalonData();
  }, [dispatch]);

  useEffect(() => {
    const fetchCustomerNotifications = async () => {
      narray = await dispatch(getCustomerNotifications());
      narray?.notificationData?.forEach((n) => {
        !n.isRead ? setAllRead(false) : null;
      });
    };

    const fetchSalonNotifications = async () => {
      narray = await dispatch(getSalonNotifcations(salonData?.salonData?.id));
      narray?.notificationData?.forEach((n) => {
        !n.isRead ? setAllRead(false) : null;
      });
    };

    localStorage.getItem("role") === "SALON_OWNER"
      ? salonData.salonData
        ? fetchSalonNotifications()
        : null
      : fetchCustomerNotifications();
  }, [dispatch]);

  useEffect(() => {
    setCart(localStorage.getItem("cart"));
  }, [localStorage.getItem("cart")]);

  return (
    <div className="flex">
      <div
        className="mx-1 text-xl my-auto me-[2rem] transition-transform duration-200 hover:scale-110"
        style={{ cursor: "pointer" }}
      >
        <i
          className={`bi  ${
            cart?.length > 0 ? " text-green-600 bi-cart-fill" : "bi-cart"
          }`}
          onClick={() => {
            navigate("/cart");
          }}
        ></i>
      </div>
      <div
        className="mx-1 text-xl my-auto transition-transform duration-200 hover:scale-110"
        style={{ cursor: "pointer" }}
      >
        <i
          className={`bi  ${
            narray?.length
              ? !allRead
                ? "bi-bell-fill text-green-600"
                : "bi-bell"
              : "bi-bell"
          }`}
          onClick={() => {
            navigate("/notifications");
          }}
        ></i>
      </div>
      <div
        className="mx-1 px-3 text-xl my-auto"
        onClick={() => {
          navigate("/login");
        }}
        style={{ cursor: "pointer" }}
      >
        <Button
          name={fullName}
          bstyle={"hover:shadow-md hover:bg-green-600 hover:text-white"}
        />
      </div>
      <div
        className="mx-1 py-1 px-3 text-xl my-auto rounded-[50%] shadow hover:shadow-md hover:bg-green-600 hover:text-white"
        style={{ cursor: "pointer" }}
      >
        {fullName?.[0]?.toUpperCase()}
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="mx-1 px-2 text-xl my-auto" style={{ cursor: "pointer" }}>
        <Button
          name={"Login"}
          bstyle={"hover:shadow-lg hover:bg-green-600 hover:text-white"}
          handleClick={() => {
            navigate("/login");
          }}
        />
      </div>
      <div className="mx-1 px-2 text-xl my-auto" style={{ cursor: "pointer" }}>
        <Button
          name={"Sign Up"}
          bstyle={"hover:shadow-lg hover:bg-green-600 hover:text-white"}
          handleClick={() => {
            navigate("/signup");
          }}
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  const loginState = useSelector((state) => state.login);

  const navigate = useNavigate();
  return (
    <div className="flex p-10">
      <div className="mx-8">
        <h1
          className="text-5xl pb-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Salon Brokers
        </h1>
      </div>
      <div
        className="flex-1 mx-8 px-7 my-auto text-xl"
        style={{ cursor: "pointer" }}
      >
        {/*Home*/}
      </div>
      <div className="flex">
        <div className="me-10 text-xl my-auto" style={{ cursor: "pointer" }}>
          <Button
            name={"Become a Partner"}
            bstyle={"hover:shadow-lg hover:bg-amber-800 hover:text-white"}
            handleClick={() => {
              navigate("/registerSalon");
            }}
          />
        </div>
        {localStorage.getItem("jwt") && loginState.loginData?.jwt ? (
          <LoginSuccess fullName={loginState.loginData.fullName} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Navbar;
