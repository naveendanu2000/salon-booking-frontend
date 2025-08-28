import api from "../../../public/api/api";

const getServices = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_SERVICES_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get(`/api/service-offering/salon/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: "GET_SERVICES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "GET_SERVICES_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getServices;
