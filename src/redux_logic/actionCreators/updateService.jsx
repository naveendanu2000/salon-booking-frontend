import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const updateService = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_SERVICES_REQUEST" });

    toast.info("Updating!", {
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
      console.log(id);
      console.log(data);
      const response = await api.post(
        `/api/service-offering/salon-owner/${id}`,
        data,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      toast.success("Service Updated!", {
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

      dispatch({ type: "UPDATE_SERVICES_SUCCESS", payload: response.data });
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
        type: "UPDATE_SERVICES_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default updateService;
