const initialState = {
  loading: false,
  completeBookingData: null,
  error: null,
};

const completeBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COMPLETE_BOOKING_REQUEST":
      return { ...state, loading: true };
    case "COMPLETE_BOOKING_SUCCESS":
      return { loading: true, cancelBookingData: action.payload, error: null };
    case "COMPLETE_BOOKING_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default completeBookingReducer;
