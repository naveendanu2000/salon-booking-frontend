import RegisterSalon from "./RegisterSalon";
import RegisterSalonOwner from "./RegisterSalonOwner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux_logic/actionCreators/loginActions";
import { useEffect, useState } from "react";

const BecomePartner = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const salonData = useSelector((state) => state?.salon?.salonData);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    setRole(localStorage.getItem("role"));
    if (token && role !== "SALON_OWNER") {
      dispatch(logout());
    }
  }, [token, role, dispatch]);

  useEffect(() => {
    if (salonData) {
      navigate("/login");
    }
  }, [navigate, salonData]);

  return (
    <>
      <div className="flex flex-row">
        <div
          className=""
          style={{
            backgroundImage: `url("assets/salon images/hairdresser-4666064_1280.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "86vh",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="inset-0 bg-black/65 min-h-[86vh] w-full h-full flex items-center justify-center pb-15">
            <div className="flex justify-center item-center grow-1">
              {token && role === "SALON_OWNER" ? (
                <RegisterSalon />
              ) : (
                <RegisterSalonOwner />
              )}
            </div>
            <div className=" grow-4 flex items-center justify-center">
              <h1 className="text-white text-9xl">Salon Brokers</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomePartner;
