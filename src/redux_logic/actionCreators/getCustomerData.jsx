import api from "../../../public/api/api";

const getCustomerData = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_CUSTOMER_DATA_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: "GET_CUSTOMER_DATA_SUCCESS", payload: response.data });
      return { loading: false, customerData: response.data, error: null };
    } catch (error) {
      dispatch({
        type: "GET_CUSTOMER_DATA_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getCustomerData;
