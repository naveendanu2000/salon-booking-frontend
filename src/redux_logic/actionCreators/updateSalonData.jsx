import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const updateSalonData = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_SALON_DATA_REQUEST" });

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
      const response = await api.patch(`/api/salons/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      toast.success("Data Updated!", {
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

      dispatch({ type: "UPDATE_SALON_DATA_SUCCESS", payload: response.data });
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
        type: "UPDATE_SALON_DATA_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default updateSalonData;
