import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const completeBoooking = (id) => {
  return async (dispatch) => {
    dispatch({ type: "COMPLETE_BOOKING_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.put(
        `/api/bookings/${id}/status?status=COMPLETED`,
        {},
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      toast.success(`Booking ${id} marked complete!`, {
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

      const notify = async () => {
        let notification = `Booking ${id} is marked complete!`;

        await api
          .post(
            `/api/notifications`,
            {
              salonId: null,
              userId: null,
              bookingId: id,
              description: notification,
            },
            { headers: { Authorization: `Bearer ${jwt}` } }
          )
          .catch((error) => {
            console.error("Unable to send notification", error);
          });
      };

      notify();

      dispatch({ type: "COMPLETE_BOOKING_SUCCESS", payload: response.data });
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
        type: "COMPLETE_BOOKING_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default completeBoooking;
