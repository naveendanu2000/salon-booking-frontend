const initialState = {
  loading: false,
  salonData: {},
  error: null,
};

const registerSalonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SALON_REQUEST":
      return { ...state, loading: true };
    case "REGISTER_SALON_SUCCESS":
      return { loading: false, salonData: action.payload, error: null };
    case "REGISTER_SALON_ERROR":
      return { loading: false, salonData: null, error: action.payload };
    default:
      return state;
  }
};

export default registerSalonReducer;
