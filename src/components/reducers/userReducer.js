const userReducer = (state, action) => {
  if (action.type === "SET_USERS") {
    return {
      ...state,
      users: action.payload,
    };
  }
  if (action.type === "DELETE_USER") {
    const newUsers = state.users.filter((user) => user.id !== action.payload);
    return {
      ...state,
      users: newUsers,
    };
  }
  if (action.type === "ADD_USER") {
    const user = action.payload;
    const newUsers = [user, ...state.users];
    return {
      ...state,
      users: newUsers,
    };
  }

  return state;
};

export default userReducer;
