const initialState = {
  loading: false,
  reviews: [],
  error: null,
};

const reviewsBySalon = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REVIEWS_BY_SALON_REQUEST":
      return { ...state, loading: true };
    case "GET_REVIEWS_BY_SALON_SUCCESS":
      return { loading: false, reviews: action.payload, error: null };
    case "GET_REVIEWS_BY_SALON_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default reviewsBySalon;
