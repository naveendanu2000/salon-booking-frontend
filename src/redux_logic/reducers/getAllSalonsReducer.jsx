const initialState = {
  loading: false,
  allSalonsData: [],
  error: null,
};

const getAllSalonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_SALONS_REQUEST":
      return { ...state, loading: true };
    case "GET_ALL_SALONS_SUCCESS":
      return { loading: false, allSalonsData: action.payload, error: null };
    case "GET_ALL_SALONS_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default getAllSalonsReducer;
