const initialState = {
  loading: false,
  review: {},
  error: null,
};

const createReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REVIEW_REQUEST":
      return { ...state, loading: true };
    case "CREATE_REVIEW_SUCCESS":
      return { loading: false, review: action.payload, error: null };
    case "CREATE_REVIEW_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default createReviewReducer;
