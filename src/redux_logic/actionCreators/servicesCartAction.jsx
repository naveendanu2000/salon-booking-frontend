export const addServicesCartAction = (data) => {
  return (dispatch) => {
    dispatch({ type: "ADD_SERVICES_TO_CART_REQUEST" });
    
    try {
      dispatch({ type: "ADD_SERVICES_TO_CART_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "ADD_SERVICES_TO_CART_ERROR",
        payload: error.message || "ERROR while adding the service to the cart",
      });
    }
  };
};

export const removeServicesCartAction = (data) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE_SERVICES_FROM_CART_REQUEST" });

    try {
      dispatch({ type: "REMOVE_SERVICES_FROM_CART_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "REMOVE_SERVICES_FROM_CART_ERROR",
        payload: error.message || "Something went wrong!",
      });
    }
  };
};
