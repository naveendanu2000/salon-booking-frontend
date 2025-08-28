import api from "../../../public/api/api";

const getCategories = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_CATERGORIES_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get(`/api/categories/salon/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "GET_CATEGORIES_ERROR",
        payload: error.message || "Swomething went wrong!",
      });
    }
  };
};

export default getCategories;
