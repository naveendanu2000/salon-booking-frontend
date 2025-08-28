import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const addService = (data) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_SERVICES_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.post(
        `/api/service-offering/salon-owner`,
        data,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      toast.success(`Service ${data.name} created!`, {
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

      dispatch({ type: "ADD_SERVICES_SUCCESS", payload: response.data });
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
        type: "ADD_SERVICES_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default addService;
