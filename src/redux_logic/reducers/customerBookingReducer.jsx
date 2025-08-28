const initialState = {
  loading: false,
  customerBookingData: [],
  error: null,
};

const customerBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CUSTOMER_BOOKINGDATA_REQUEST":
      return { ...state, loading: true };
    case "CUSTOMER_BOOKINGDATA_SUCCESS":
      return {
        loading: false,
        customerBookingData: action.payload,
        error: null,
      };
    case "CUSTOMER_BOOKINGDATA_ERROR":
      return {
        loading: false,
        customerBookingData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerBookingReducer;
