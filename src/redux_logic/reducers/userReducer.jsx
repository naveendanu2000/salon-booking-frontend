const initialState = {
  loading: false,
  error: null,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER_REQUEST":
      return { ...state, loading: true };
    case "CREATE_USER_SUCCESS":
      return { loading: false, user: action.payload, error: null };
    case "CREATE_USER_ERROR":
      return { loading: false, user: null, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
