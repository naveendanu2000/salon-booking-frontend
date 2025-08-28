import api from "../../../public/api/api";

export const getSalonData = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_SALON_DATA_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get("/api/salons/owner", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: "GET_SALON_DATA_SUCCESS", payload: response.data });

      return { loading: false, salonData: response.data, error: null };
    } catch (error) {
      dispatch({
        type: "GET_SALON_DATA_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};
