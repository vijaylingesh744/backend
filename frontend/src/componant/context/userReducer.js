export const userReducer = (state = null, action) => {
    switch (action.type) {
      case "LOGGED_IN_USER":
        localStorage.setItem("userdata", JSON.stringify(action.payload));
        return action.payload;
      case "LOGOUT":
        localStorage.removeItem("userdata");
        return null; 
      default:
        return state;
    }
};
  