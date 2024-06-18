import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton component={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>

        <Box sx={{ width: "50%", margin: "auto" }}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Movies"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  style: { color: "white" },
                }}
              />
            )}
          />
        </Box>

        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab component={Link} to="/movies" label="Movies" />
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Tab label="Admin" component={Link} to="/admin" />
              <Tab label="User" component={Link} to="/auth" />
            </>
          )}
          {isUserLoggedIn && (
            <>
              <Tab label="Profile" component={Link} to="/user" />
              <Tab
                label="Logout"
                onClick={() => logout(false)}
                component={Link}
                to="/"
              />
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <Tab label="Add Movie" component={Link} to="/add" />
              <Tab label="Profile" component={Link} to="/user-admin" />
              <Tab
                label="Logout"
                onClick={() => logout(true)}
                component={Link}
                to="/"
              />
            </>
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
