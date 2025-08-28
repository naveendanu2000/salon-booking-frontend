const initialState = {
  loading: false,
  cancelBookingData: null,
  error: null,
};

const cancelBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CANCEL_BOOKING_REQUEST":
      return { ...state, loading: true };
    case "CANCEL_BOOKING_SUCCESS":
      return { loading: true, cancelBookingData: action.payload, error: null };
    case "CANCEL_BOOKING_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default cancelBookingReducer;
