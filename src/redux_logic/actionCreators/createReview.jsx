import { toast, Slide } from "react-toastify";
import api from "../../../public/api/api";

const createReview = (data, salonId) => {
  return async (dispatch) => {
    dispatch({ type: "CREATE_REVIEW_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.post(`/api/reviews/salon/${salonId}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      toast.success(`Feedback Submitted!`, {
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

      dispatch({ type: "CREATE_REVIEW_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "CREATE_REVIEW_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default createReview;
