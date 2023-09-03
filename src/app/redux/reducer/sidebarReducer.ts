type ActionModel = {
  type: string;
  payload: boolean;
};

const reducer = (initialState: boolean = false, action: ActionModel) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return action.payload;
    default:
      return initialState;
  }
};

export default reducer;
