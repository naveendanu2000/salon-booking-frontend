import React from "react";
import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

export const signup = (data) => {
  return async (dispatch) => {
    dispatch({ type: "SIGNUP_REQUEST" });

    toast.info("Signing Up!", {
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

    try {
      const response = await api.post("/auth/signup", data);
      console.log(data);
      console.log(response);
      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("fullName", data.fullName);
      }

      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: { ...response.data, fullName: data.fullName },
      });

      toast.info("Signed Up!", {
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

      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: { ...response.data, fullName: data.fullName },
      });
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

      dispatch({
        type: "SIGNUP_ERROR",
        payload: { error: error.message || "Something went wrong!" },
      });
    }
  };
};
