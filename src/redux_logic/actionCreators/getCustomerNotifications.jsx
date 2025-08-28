import api from "../../../public/api/api";

export const getCustomerNotifications = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_NOTIFICATIONS_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const customerData = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const response = await api.get(
        `/api/notifications/user/${customerData.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: "GET_NOTIFICATIONS_SUCCESS",
        payload: response.data || [],
      });
      return { loading: false, notificationData: response.data, error: null };
    } catch (error) {
      dispatch({
        type: "GET_NOTIFICATIONS_ERROR",
        payload: error.message || "Something went Wrong!",
      });
    }
  };
};
