import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

export const registerSalon = ({ data }) => {
  return async (dispatch) => {
    dispatch({ type: "REGISTER_SALON_REQUEST" });

    toast.info("Registering Salon!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.post("/api/salons", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      toast.success("Salon Registered!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch({ type: "REGISTER_SALON_SUCCESS", payload: response.data });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch({
        type: "REGISTER_SALON_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export const updateSalon = () => {
  return async (dispatch) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get("/api/salons/owner", {
        headers: {
          Authorization: `Bearer: ${jwt}`,
        },
      });

      dispatch({ type: "REGISTER_SALON_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "REGISTER_SALON_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};
