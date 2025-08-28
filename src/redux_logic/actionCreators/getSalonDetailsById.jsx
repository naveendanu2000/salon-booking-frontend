import api from "../../../public/api/api";

const getSalonDetailsById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_SALON_DETAILS_BY_ID_REQUEST" });

    try {
      const response = await api.get(`/api/salons/${id}`);
      dispatch({
        type: "GET_SALON_DETAILS_BY_ID_SUCCESS",
        payload: response.data,
      });
      return { loading: false, salonData: response.data, error: null };
    } catch (error) {
      dispatch({
        type: "GET_SALON_DETAILS_BY_ID_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getSalonDetailsById;
