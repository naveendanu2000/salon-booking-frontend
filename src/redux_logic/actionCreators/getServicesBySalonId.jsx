import React from "react";
import api from "../../../public/api/api";

const getServicesBySalonId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_SERVICES_BY_SALON_ID_REQUEST" });

    try {
      const response = await api.get(`/api/service-offering/salon/${id}`);
      dispatch({
        type: "GET_SERVICES_BY_SALON_ID_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "GET_SERVICES_BY_SALON_ID_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getServicesBySalonId;
