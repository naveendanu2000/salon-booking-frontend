const initialState = {
  loading: false,
  service: {},
  error: null,
};

const servicesByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SERVICES_BY_ID_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICES_BY_ID_SUCCESS":
      return {
        loading: false,
        service: { ...action.payload },
        error: null,
      };
    case "GET_SERVICES_BY_ID_ERROR":
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default servicesByIdReducer;
