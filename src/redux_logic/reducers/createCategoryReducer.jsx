const initialState = {
  loading: false,
  createCategoryData: null,
  error: null,
};

const createCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "CREATE_CATEGORY_SUCCESS":
      return {
        loading: false,
        createCategoryData: action.payload,
        error: false,
      };
    case " CREATE_CATEGORY_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default createCategoryReducer;
