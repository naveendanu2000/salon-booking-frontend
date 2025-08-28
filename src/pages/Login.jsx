import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../redux_logic/actionCreators/loginActions";
import { toast, Slide } from "react-toastify";

import Button from "../components/smaller_components/Button";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.login);
  const customerDataState = useSelector((state) => state.customerData);

  const location = useLocation();
  const loginFirst = location.state?.message || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: username, password }));
  };

  useEffect(() => {
    if (loginFirst)
      toast.info(loginFirst, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
  });

  useEffect(() => {
    !loginState.error ? navigate("/") : navigate("/login");
  }, [loginState.error, navigate]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      if (localStorage.getItem("role") === "CUSTOMER") navigate("/customer");
      else if (localStorage.getItem("role") === "SALON_OWNER")
        navigate("/admin");
    }
  }, [navigate, customerDataState]);

  return (
    <div className="flex flex-row">
      <div
        className=""
        style={{
          backgroundImage: `url("assets/salon images/hairdresser-4666064_1280.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "86vh",
          width: "100%",
        }}
      >
        <div className="inset-0 bg-black/65 w-full h-full flex items-center justify-center pb-15">
          <div className="flex justify-center item-center grow-1">
            <form
              className="p-5 justify-center text-center flex flex-col text-white"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h1 className="text-3xl my-5">Login</h1>
              <input
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
                placeholder="username"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1"
                placeholder="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                name={"Login"}
                disabled={loginState.loading}
                bstyle={
                  "text-green-300 hover:bg-green-300 hover:text-black hover:ring-1 hover:shadow-gray-600 w-30 mx-auto shadow-md m-5 ring-1 "
                }
                type={"submit"}
              />
            </form>
          </div>
          <div className=" grow-4 flex items-center justify-center">
            <h1 className="text-white text-9xl">Salon Brokers</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
