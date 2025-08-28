const initialState = {
  loading: false,
  salonData: {},
  error: null,
};

const salonDataUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SALON_DATA_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SALON_DATA_SUCCESS":
      return { loading: false, salonData: action.payload, error: null };
    case "UPDATE_SALON_DATA_ERROR":
      console.log(action.payload);
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default salonDataUpdateReducer;
