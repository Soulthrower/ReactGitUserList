import React, { useContext, useReducer } from "react";
import { Container, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";
import { useFetch, useFetchTimeout } from "./hooks/useFetch";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const defaultUserState = {
  users: [],
};

const defaultSearchState = {
  searchResults: [],
  searchQuery: "",
};

const UserContext = React.createContext();
const url = "https://api.github.com/users";

const UserListBlock = ({ user }) => {
  const classes = useStyles();
  const { userDispatch } = useContext(UserContext);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`Avatar of ${user.login}`}
          height="140"
          image={user.avatar_url}
          title={`Avatar of ${user.login}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.login}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            userDispatch({ type: "DELETE_USER", payload: user.id });
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const UserSearchBlock = ({ user }) => {
  const classes = useStyles();
  const { userDispatch, users } = useContext(UserContext);

  const isUserAlreadyAdded = (id) => {
    var found = false;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        found = true;
        break;
      }
    }
    return found;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`Avatar of ${user.login}`}
          height="140"
          image={user.avatar_url}
          title={`Avatar of ${user.login}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.login}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          disabled={isUserAlreadyAdded(user.id)}
          onClick={() => {
            userDispatch({ type: "ADD_USER", payload: user });
          }}
        >
          ADD
        </Button>
      </CardActions>
    </Card>
  );
};

const UserList = () => {
  const users = useContext(UserContext).users;
  return (
    <Grid container spacing={3}>
      {users.map((user) => {
        return (
          <Grid key={user.id} item xs={6} sm={3}>
            <UserListBlock user={user} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const UserSearchResults = () => {
  const { searchState } = useContext(UserContext);

  return (
    <Grid container spacing={3}>
      {searchState.searchResults.map((user) => {
        return (
          <Grid key={user.id} item xs={12} sm={12}>
            <UserSearchBlock user={user} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const UserSearch = () => {
  const { searchDispatch, searchState } = useContext(UserContext);

  const searchForUser = (event) => {
    searchDispatch({ type: "SET_SEARCH_QUERY", payload: event.target.value });
  };

  const searchUrl = `https://api.github.com/search/users?q=${searchState.searchQuery}`;
  useFetchTimeout(
    searchUrl,
    searchState.searchQuery,
    searchDispatch,
    "SET_SEARCHED_USERS",
    500
  );

  return (
    <TextField
      id="searchinput"
      label="Label"
      style={{ margin: 8 }}
      placeholder="Search a GitHub username !"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={searchForUser}
    />
  );
};

const GitHubListAndSearch = () => {
  const [userState, userDispatch] = useReducer(userReducer, defaultUserState);
  const [searchState, searchDispatch] = useReducer(
    searchReducer,
    defaultSearchState
  );

  useFetch(url, userDispatch, "SET_USERS");

  return (
    <UserContext.Provider
      value={{
        userDispatch,
        users: userState.users,
        searchDispatch,
        searchState,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant="h3" gutterBottom>
              Users List
            </Typography>
            <div>{userState.users ? <UserList /> : "Loading"}</div>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h3" gutterBottom>
              Search Users
            </Typography>
            <UserSearch />
            <div>{searchState.searchResults ? <UserSearchResults /> : ""}</div>
          </Grid>
        </Grid>
      </Container>
    </UserContext.Provider>
  );
};

export default GitHubListAndSearch;
