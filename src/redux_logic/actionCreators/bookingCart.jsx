import api from "../../../public/api/api";
import { toast, Slide } from "react-toastify";

const bookingCart = (salonId, data) => {
  return async (dispatch) => {
    dispatch({ type: "BOOK_CART_REQUEST" });

    const id = toast.loading("Routing to payment page!");
    
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.post(
        `/api/bookings?salonId=${salonId}&paymentMethod=RAZORPAY`,
        data,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      toast.update(id);

      dispatch({ type: "BOOK_CART_SUCCESS", payload: response.data });

      if (response.data.payment_link_url)
        window.open(response.data.payment_link_url, "_self");
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
        type: "BOOK_CART_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};

export default bookingCart;
