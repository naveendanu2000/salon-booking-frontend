import api from "../../../public/api/api";

export const getCustomerBookings = () => {
  return async (dispatch) => {
    dispatch({ type: "CUSTOMER_BOOKINGDATA_REQUEST" });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get("/api/bookings/customer", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: "CUSTOMER_BOOKINGDATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "CUSTOMER_BOOKINGDATA_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};
