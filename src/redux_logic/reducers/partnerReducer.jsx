const initialState = {
  loading: false,
  partner: null,
  error: null,
};

const partnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PARTNER_REQUEST":
      return { ...state, loading: true };
    case "CREATE_PARTNER_SUCCESS":
      return { loading: false, partner: action.payload, error: null };
    case "CREATE_PARTNER_FALSE":
      return { loading: false, partner: null, error: action.payload };
    default:
      return state;
  }
};

export default partnerReducer;
