const initialState = {
  loading: false,
  servicesData: [],
  error: null,
};
const getServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SERVICES_REQUEST":
      return { loading: true, ...state };
    case "GET_SERVICES_SUCCESS":
      return { loading: false, servicesData: action.payload, error: null };
    case "GET_SERVICES_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default getServicesReducer;
