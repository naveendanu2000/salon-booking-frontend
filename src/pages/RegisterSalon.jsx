/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "../components/smaller_components/Button";
import TimePicker from "../components/smaller_components/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { registerSalon } from "../redux_logic/actionCreators/registerSalon";
import { useNavigate } from "react-router-dom";

const RegisterSalon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salonDataState = useSelector((state) => state.salonData);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [openTimeHours, setOpenTimeHours] = useState("9");
  const [openTimeMinutes, setOpenTimeMinutes] = useState("0");
  const [closeTimeHours, setCloseTimeHours] = useState("18");
  const [closeTimeMinutes, setCloseTimeMinutes] = useState("0");

  useEffect(() => {
    if (
      salonDataState.salonData &&
      Object.keys(salonDataState.salonData).length > 0
    ) {
      console.log(salonDataState.salonData, "navigating to login");
      navigate("/admin");
    }
  }, [salonDataState.salonData, navigate]);

  const handleOpeningHours = (hours) => {
    setOpenTimeHours(hours);
  };
  const handleOpeningMinutes = (minutes) => {
    setOpenTimeMinutes(minutes);
  };

  const handleClosingHours = (hours) => {
    setCloseTimeHours(hours);
  };

  const handleClosingMinutes = (minutes) => {
    setCloseTimeMinutes(minutes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log({
    //   name,
    //   address,
    //   phoneNumber,
    //   email,
    //   city,
    //   openTime: `${openTimeHours}:${openTimeMinutes}:00`,
    //   closeTime: `${closeTimeHours}:${closeTimeMinutes}:00`,
    //   images: [
    //     "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     "https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   ],
    // });

    dispatch(
      registerSalon({
        name,
        address,
        phoneNumber,
        email,
        city,
        openTime: `${
          openTimeHours < 10 ? `0` + openTimeHours : openTimeHours
        }:${openTimeMinutes < 10 ? `0` + openTimeMinutes : openTimeMinutes}:00`,
        closeTime: `${
          closeTimeHours < 10 ? `0` + closeTimeHours : closeTimeHours
        }:${
          closeTimeMinutes < 10 ? `0` + closeTimeMinutes : closeTimeMinutes
        }:00`,
        images: [
          "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
      })
    );

    navigate("/login");
  };

  return (
    <div>
      <form
        className="p-5 justify-center text-center flex flex-col text-white"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h1 className="text-3xl my-5">Register Salon</h1>
        <input
          className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
          placeholder="Name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
          placeholder="Address"
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <input
          className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
          placeholder="City"
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
          placeholder="Phone Number"
          type="text"
          maxLength="10"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <input
          className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
          placeholder="Email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TimePicker
          heading={"Opening Time"}
          hours={openTimeHours}
          minutes={openTimeMinutes}
          handleHours={handleOpeningHours}
          handleMinutes={handleOpeningMinutes}
        />
        <TimePicker
          heading={"Closing Time"}
          hours={closeTimeHours}
          minutes={closeTimeMinutes}
          handleHours={handleClosingHours}
          handleMinutes={handleClosingMinutes}
        />
        <Button
          name={"Register"}
          bstyle={
            "text-green-300 hover:bg-green-300 hover:text-black hover:ring-1 hover:shadow-gray-600 w-30 mx-auto shadow-md m-5 ring-1"
          }
          type={"submit"}
        />
      </form>
    </div>
  );
};

export default RegisterSalon;
