import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux_logic/actionCreators/signupActions";

import Button from "../components/smaller_components/Button";
import { useNavigate } from "react-router-dom";

const RegisterSalonOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("SALON_OWNER");
  const [password, setPassword] = useState("");
  const [confirmPassoword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, fullName, email, password, role }));
    navigate("/registerSalon");
  };

  return (
    <div>
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
          disabled={true}
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
  );
};

export default RegisterSalonOwner;
