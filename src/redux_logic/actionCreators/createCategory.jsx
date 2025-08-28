import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const createCategory = (data) => {
  return async (dispatch) => {
    dispatch({ type: "CREATE_CATEGORY_REQUEST" });

    toast.info(`Creating Category!`, {
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
      const response = api.post("/api/categories/salon-owner", data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      toast.success(`New Category ${data.name} created`, {
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

      dispatch({ type: "CREATE_CATEGORY_SUCCESS", payload: response.data });
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
        type: "CREATE_CATEGORY_ERROR",
        payload: error.message || "Something went wrong",
      });
    }
  };
};

export default createCategory;
