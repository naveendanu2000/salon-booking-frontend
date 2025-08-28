const initialState = {
  loading: false,
  notificationData: [],
  error: null,
};

const customerNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS_REQUEST":
      return { ...state, loading: false };
    case "GET_NOTIFICATIONS_SUCCESS":
      return { loading: false, notificationData: action.payload, error: null };
    case "GET_NOTIFICATIONS_ERROR":
      return { loading: false, notificationData: null, error: action.payload };
    default:
      return state;
  }
};

export default customerNotificationReducer;
