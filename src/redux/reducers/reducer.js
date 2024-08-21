const initialState = {
  carts: [],
};

export const cartReducer = (state = initialState, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      const exist = state.carts.find((x) => x.id === product.id);
      if (exist) {
        return {
          ...state,
          carts: state.carts.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          carts: [
            ...state.carts,
            {
              ...product,
              qty: 1,
            },
          ],
        };
      }

    case "DELITEM":
      const productId = action.payload;
      const exist1 = state.carts.find((x) => x.id === productId);
      if (exist1.qty === 1) {
        return {
          ...state,
          carts: state.carts.filter((x) => x.id !== productId),
        };
      } else {
        return {
          ...state,
          carts: state.carts.map((x) =>
            x.id === productId ? { ...x, qty: x.qty - 1 } : x
          ),
        };
      }
    case "REMOVEALL":
      return {
        ...state,
        carts: state.carts.filter((x) => x.id !== action.payload),
      };


    default:
      return state;
  }
};
