import api from "../../../public/api/api";

const getSalonNotifcations = (salonId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_SALON_NOTIFICATIONS_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get(
        `/api/notifications/salon-owner/salon/${salonId}`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      dispatch({
        type: "FET_SALON_NOTIFICATIONS_SUCCESS",
        payload: response.data,
      });

      return { loading: false, notificationsData: response.data, error: null };
    } catch (error) {
      dispatch({
        type: "GET_SALON_NOTIFICATIONS_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getSalonNotifcations;
