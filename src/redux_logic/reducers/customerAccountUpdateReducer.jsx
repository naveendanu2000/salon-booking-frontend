const initialState = {
  loading: false,
  customerUpdateData: {},
  error: null,
};

const customerAccountUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CUSTOMER_ACCOUNT_UPDATE_REQUEST":
      return { ...state, loading: true };
    case "CUSTOMER_ACCOUNT_UPDATE_SUCCESS":
      return {
        loading: false,
        customerUpdateData: action.payload,
        error: null,
      };
    case "CUSTOMER_ACCOUNT_UPDATE_ERROR":
      return {
        loading: false,
        customerUpdateData: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerAccountUpdateReducer;
