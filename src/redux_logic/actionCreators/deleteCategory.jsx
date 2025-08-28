import React from "react";
import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY_REQUEST" });

    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.delete(`/api/categories/salon-owner/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      toast.success("Service Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: response.data });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch({ type: "DELTE_CATEGORY_ERROR", payload: error.message });
    }
  };
};

export default deleteCategory;
