const initialState = {
  loading: false,
  customerData: {},
  error: null,
};

const customerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CUSTOMER_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_CUSTOMER_DATA_SUCCESS":
      return { loading: false, customerData: action.payload, error: null };
    case "GET_CUSTOMER_DATA_ERROR":
      return { loading: false, customerData: null, error: action.payload };
    case "CUSTOMER_DATA_RESET":
      return initialState;
    default:
      return state;
  }
};

export default customerDataReducer;
