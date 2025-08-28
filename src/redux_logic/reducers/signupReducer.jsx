const initialState = {
  loading: false,
  singupData: null,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST":
      return { ...state, loading: true };
    case "SIGNUP_SUCCESS":
      return { loading: false, singupData: action.payload, error: null };
    case "SIGNUP_ERROR":
      return { loading: false, signupData: null, error: action.payload.error };
    default:
      return state;
  }
};

export default signupReducer;
