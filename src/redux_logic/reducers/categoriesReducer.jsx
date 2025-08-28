const initialState = {
  loading: false,
  categoriesData: [],
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_REQUEST":
      return { loading: true, ...state };
    case "GET_CATEGORIES_SUCCESS":
      return { loading: false, categoriesData: action.payload, error: false };
    case "GET_CATEGORIES_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
