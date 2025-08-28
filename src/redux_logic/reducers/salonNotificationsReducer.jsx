const initialState = {
  loading: false,
  notificationsData: [],
  erorr: null,
};

const salonNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SALON_NOTIFICATIONS_REQUEST":
      return { ...state, loading: true };
    case "GET_SALON_NOTIFICATIONS_SUCCESS":
      return { loading: false, notificationsData: action.payload, error: null };
    case "GET_SALON_NOTIFICATIONS_ERROR":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default salonNotificationsReducer;
