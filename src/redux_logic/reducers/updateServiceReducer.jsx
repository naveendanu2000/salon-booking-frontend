const initialState = {
  loading: false,
  updateServiceData: {},
  error: null,
};

const updateServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SERVICES_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SERVICES_SUCCESS":
      return { loading: false, updateServiceData: action.payload, error: null };
    case "UPDATE_SERVICES_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default updateServiceReducer;
