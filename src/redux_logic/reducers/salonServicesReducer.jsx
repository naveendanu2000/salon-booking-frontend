const initialState = {
  loading: false,
  salonData: null,
  error: null,
};

const salonServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SERVICES_BY_SALON_ID_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICES_BY_SALON_ID_SUCCESS":
      return { loading: false, salonData: action.payload, error: false };
    case "GET_SERVICES_BY_SALON_ID_ERROR":
      return { loading: false, salonData: null, error: action.payload };
    default:
      return state;
  }
};

export default salonServicesReducer;
