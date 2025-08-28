const initialState = {
  loading: false,
  addServiceData: {},
  error: null,
};

const addServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SERVICES_REQUEST":
      return { ...state, loading: true };
    case "ADD_SERVICES_SUCCESS":
      return { loading: false, addServiceData: action.payload };
    case "ADD_SERVICES_ERROR":
      return { ...initialState, erorr: action.payload };
    default:
      return state;
  }
};

export default addServiceReducer;
