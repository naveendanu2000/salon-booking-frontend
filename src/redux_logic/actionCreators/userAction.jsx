import api from "../../../public/api/api";

export const registerPartner = ({ data }) => {
  return async (dispatch) => {
    dispatch({ type: "CREATE_USER_REQUEST" });

    try {
      const response = await api.post("/user", data);
      const { token } = response.data;

      localStorage.setItem("authToken", token);
      dispatch({ type: "CREATE_USER_SUCCESS", payload: null });
    } catch (error) {
      dispatch({
        type: "CREATE_USER_ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};
