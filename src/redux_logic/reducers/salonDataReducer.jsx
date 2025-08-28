const initialState = {
  loading: false,
  salonData: {},
  error: null,
};

const salonDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SALON_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SALON_DATA_SUCCESS":
      return { loading: false, salonData: action.payload, error: null };
    case "GET_SALON_DATA_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default salonDataReducer;
