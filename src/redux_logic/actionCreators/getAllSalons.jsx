import api from "../../../public/api/api";

const getAllSalons = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_ALL_SALONS_REQUEST" });
    try {
        const response = await api.get("/api/salons");
      dispatch({ type: "GET_ALL_SALONS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "GET_ALL_SALONS_ERROR",
        payload: error.message || "something went wrong!",
      });
    }
  };
};

export default getAllSalons;
