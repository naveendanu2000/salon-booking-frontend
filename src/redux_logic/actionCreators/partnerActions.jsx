import api from "../../../public/api/api";

export const registerPartner = ( data ) => {
  return async (dispatch) => {
    dispatch({ type: "CREATE_PARTNER_REQUEST" });

    try {
      const response = await api.post("/partner", data);
      const { token } = response.data;

      localStorage.setItem("authToken", token);
      dispatch({ type: "CREATE_PARTNER_SUCCESS", payload: null });
    } catch (error) {
      dispatch({
        type: "CREATE_PARTNER_ERROR",
        payload: error.response?.data?.error || error.error,
      });
    }
  };
};
