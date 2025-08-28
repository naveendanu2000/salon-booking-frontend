import api from "../../../public/api/api";
import { login } from "./loginActions";

export const updateCustomerAccount = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "CUSTOMER_ACCOUNT_UPDATE_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.put(`/api/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: "GET_CUSTOMER_DATA_SUCCESS",
        payload: response.data,
      });

      dispatch({
        type: "CUSTOMER_ACCOUNT_UPDATE_SUCCESS",
        payload: response.data,
      });

      dispatch(login({ email: data.email, password: data.password }));
    } catch (error) {
      dispatch({
        type: "CUSTOMER_ACCOUNT_UPDATE_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};
