import React from "react";
import api from "../../../public/api/api";

const getReviewsBySalon = (salonId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_REVIEWS_BY_SALON_REQUEST" });

    try {
      const response = await api.get(`/api/reviews/salon/${salonId}`);

      dispatch({
        type: "GET_REVIEWS_BY_SALON_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "GET_REVIEWS_BY_SALON_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getReviewsBySalon;
