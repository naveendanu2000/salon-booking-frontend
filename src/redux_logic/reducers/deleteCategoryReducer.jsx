const initialState = {
  loading: false,
  deleteData: {},
  error: null,
};

const deleteCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CATEGORY_REQUEST":
      return { loading: true, ...state };
    case "DELETE_CATEGORY_SUCCESS":
      return { loading: false, deleteDate: action.payload, error: null };
    case "DELETE_CATEGORY_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default deleteCategoryReducer;
