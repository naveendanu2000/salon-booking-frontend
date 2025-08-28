import { useNavigate } from "react-router-dom";
import api from "../../../public/api/api";

export const getSalonServices = (id) => {
  return async (dispatch) => {
    const navigate = useNavigate();
    dispatch({ type: "GET_SERVICES_BY_SALON_ID_REQUEST" });

    const token = localStorage.getItem("awt")
      ? localStorage.getItem("awt")
      : navigate("/login");
    try {
      const response = await api.get(`/api/service-offering/salon/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
