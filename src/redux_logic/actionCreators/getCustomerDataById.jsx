import React from "react";
import api from "../../../public/api/api";

const getCustomerDataById = (userId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_USER_BY_ID_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      dispatch({ type: "GET_USER_BY_ID_SUCCESS", payload: response.data });

      return response.data;
    } catch (error) {
      dispatch({
        type: "GET_USER_BY_ID_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default getCustomerDataById;
