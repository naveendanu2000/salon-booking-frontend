const initialState = {
  loading: false,
  notificationStatus: null,
  error: null,
};

const notificationReadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MARK_NOTIFICATION_READ_REQUEST":
      return { ...state, loading: false };
    case "MARK_NOTIFICATION_READ_SUCCESS":
      return {
        loading: false,
        notificationStatus: action.payload,
        erorr: null,
      };
    case "MARK_NOTIFICATION_READ_ERROR":
      return {
        loading: false,
        notificationStatus: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReadReducer;
