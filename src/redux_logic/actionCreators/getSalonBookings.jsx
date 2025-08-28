import api from "../../../public/api/api";

const getSalonBookings = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_SALON_BOOKINGS_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get("/api/bookings/salon", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      
      dispatch({ type: "GET_SALON_BOOKINGS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "GET_SALON_BOOKINGS_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getSalonBookings;
