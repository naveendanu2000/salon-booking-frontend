const initialState = {
  loading: false,
  cartResponse: {},
  error: null,
};

const bookingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK_CART_REQUEST":
      return { loading: true, ...state };
    case "BOOK_CART_SUCCESS":
      return { loading: false, cartResponse: action.payload, error: null };
    case "BOOK_CART_ERROR":
      return { error: action.payload, ...initialState };
    default:
      return state;
  }
};

export default bookingCartReducer;
