import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

export const markNotificationAsRead = (id) => {
  return async (dispatch) => {
    dispatch({ type: "MARK_NOTIFICATION_READ_REQUEST" });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.put(
        `/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      toast.success("Marked Read!", {
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
        type: "MARK_NOTIFICATION_READ_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "MARK_NOTIFICATION_READ_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};
