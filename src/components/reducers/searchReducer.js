const searchReducer = (state, action) => {
  if (action.type === "SET_SEARCHED_USERS") {
    return {
      ...state,
      searchResults: action.payload.items,
    };
  }

  if (action.type === "RESET_SEARCHED_USER") {
    const newUsers = state.users.filter((user) => user.id !== action.payload);
    return {
      ...state,
      users: newUsers,
    };
  }

  if (action.type === "SET_SEARCH_QUERY") {
    return {
      ...state,
      searchQuery: action.payload,
    };
  }

  return state;
};

export default searchReducer;
