const initialState = {
  loading: false,
  loginData: null,
  error: "Something Went Wrong!",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_USER_SUCCESS":
      return { loading: false, loginData: action.payload, error: null };
    case "LOGIN_USER_ERROR":
      return { ...initialState, error: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
