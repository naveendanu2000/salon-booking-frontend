const initialState = {
  loading: false,
  salonBookings: [],
  error: null,
};

const salonBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SALON_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "GET_SALON_BOOKINGS_SUCCESS":
      return { loading: false, salonBookings: action.payload, error: null };
    case "GET_SALON_BOOKING_ERROR":
      return { ...initialState, erorr: action.payload };
    default:
      return state;
  }
};

export default salonBookingReducer;
