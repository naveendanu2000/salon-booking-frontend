import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_USER_REQUEST" });

    const id = toast.loading("Logging in");

    try {
      const response = await api.post("/auth/login", data);
      const responseData = await response.data;
      const responseName = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${responseData.jwt}`,
        },
      });
      const responseNameData = await responseName.data;
      localStorage.setItem("fullName", responseNameData.fullName);
      localStorage.setItem("jwt", responseData.jwt);
      localStorage.setItem("role", responseData.role);

      toast.update(id, {
        render: "Login successful",
        type: "success",
        isLoading: false,
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

      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: { ...responseData, fullName: responseNameData.fullName },
      });
    } catch (error) {
      toast.update(id, {
        render: "Login Failed",
        type: "error",
        isLoading: false,
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
      dispatch({
        type: "LOGIN_USER_ERROR",
        payload: error.message || "Something Went Wrong!",
      });
    }
  };
};

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
  localStorage.removeItem("fullName");

  toast.success("Logged Out!", {
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

  return (dispatch) => {
    dispatch({ type: "CUSTOMER_DATA_RESET" });
    dispatch({ type: "LOGOUT" });
  };
};
