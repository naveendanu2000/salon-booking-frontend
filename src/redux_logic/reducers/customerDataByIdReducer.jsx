const initialState = {
  loading: false,
  customerData: {},
  error: null,
};
const customerDataByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_REQUEST":
      return { loading: true, ...state };
    case "GET_USER_BY_ID_SUCCESS":
      return { loading: false, customerData: action.payload, error: null };
    case "GET_USER_BY_ID_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default customerDataByIdReducer;
