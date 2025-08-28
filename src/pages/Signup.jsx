import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux_logic/actionCreators/signupActions";
import { useNavigate } from "react-router-dom";
import Button from "../components/smaller_components/Button";

const Signup = ({ sentRole = "CUSTOMER" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(sentRole);
  const [password, setPassword] = useState("");
  const [confirmPassoword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ fullName, email, password, username, role }));
  };

  useEffect(() => {
    localStorage.getItem("jwt") ? navigate("/login") : null;
  });

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
              <h1 className="text-3xl my-5">Sign Up</h1>
              <input
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
                placeholder="Username"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
                placeholder="FullName"
                type="text"
                onChange={(e) => {
                  setFullName(e.target.value);
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
              <select
                disabled={sentRole === "SALON_OWNER"}
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value={"SALON_OWNER"}>Salon Owner</option>
                <option value={"CUSTOMER"}>Customer</option>
              </select>

              <input
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                className="p-4 m-4 w-80 outline-none border-0 rounded-md ring-1 "
                placeholder="confirmPassword"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <Button
                name={"Sign Up"}
                bstyle={
                  "text-green-300 hover:bg-green-300 hover:text-black hover:ring-1 hover:shadow-gray-600 w-30 mx-auto shadow-md m-5 ring-1"
                }
                type={"submit"}
                disabled={!(password === confirmPassoword)}
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

export default Signup;
