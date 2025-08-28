import React from "react";
import api from "../../../public/api/api";

const getServiceById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_SERVICES_BY_ID_REQUEST" });

    try {
      if (id) {
        const response = await api.get(`/api/service-offering/${id}`);
        dispatch({
          type: "GET_SERVICES_BY_ID_SUCCESS",
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: "GET_SERVICES_BY_ID_ERROR",
        payload: error.message || "Something went wrong",
      });
    }
  };
};

export default getServiceById;
