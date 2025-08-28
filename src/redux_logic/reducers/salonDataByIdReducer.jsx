const initialState = {
  loading: false,
  salonData: {
    images: [],
  },
  error: null,
};

const salonByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SALON_DETAILS_BY_ID_REQUEST":
      return { ...state, loading: true };
    case "GET_SALON_DETAILS_BY_ID_SUCCESS":
      return { loading: false, salonData: action.payload, error: null };
    case "GET_SALON_DETAILS_BY_ID_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default salonByIdReducer;
