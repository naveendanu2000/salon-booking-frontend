const initialState = {
  loading: false,
  cart: [],
  error: null,
};

const servicesCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SERVICES_TO_CART_REQUEST":
      return { ...state, loading: true };
    case "ADD_SERVICES_TO_CART_SUCCESS":
      if (state.cart.find((item) => item.id === action.payload.id))
        return {
          loading: false,
          cart: state.cart,
          error: null,
        };
      if (
        !JSON.parse(localStorage.getItem("cart") || "[]").includes(
          action.payload.id
        )
      ) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("cart") || "[]"),
            action.payload.id,
          ])
        );
      }
      return {
        loading: false,
        cart: [...state.cart, action.payload],
        error: null,
      };
    case "ADD_SERVICES_TO_CART_ERROR":
      return { loading: false, cart: state.cart, error: action.payload };
    default:
      return state;
    case "REMOVE_SERVICES_FROM_CART_REQUEST":
      return { loading: true, cart: state.cart, error: null };
    case "REMOVE_SERVICES_FROM_CART_SUCCESS":
      localStorage.setItem(
        "cart",
        JSON.stringify(
          JSON.parse(localStorage.getItem("cart") || "[]").filter(
            (id) => id !== action.payload
          )
        )
      );

      return {
        loading: false,
        cart: state.cart.filter((item) => item.id !== action.payload),
        error: null,
      };
    case "REMOVE_SERVICES_FROM CART_ERROR":
      return {
        loading: false,
        cart: state.cart,
        error: null,
      };
  }
};

export default servicesCartReducer;
