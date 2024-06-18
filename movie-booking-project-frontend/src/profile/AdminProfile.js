import { Box, Grid, Typography, Button, Card, CardContent, CardActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [fetchedMovies, setFetchedMovies] = useState([]);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmin(res.admin);
        setFetchedMovies(res.admin.addedMovies);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteMovieById = async (id) => {
    await axios.delete(`http://localhost:5000/movie/${id}`)
      .then(() => {
        setFetchedMovies((prevMovies) => prevMovies.filter(movie => movie._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width="100%" padding={3}>
      {admin && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
            <AccountCircleIcon sx={{ fontSize: "10rem" }} />
            <Typography
              mt={2}
              padding={1}
              textAlign="center"
              border="1px solid #ccc"
              borderRadius={2}
              width="100%"
              maxWidth="300px"
            >
              Email: {admin.email}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            {admin.addedMovies.length > 0 && (
              <>
                <Typography
                  variant="h4"
                  fontFamily="verdana"
                  textAlign="center"
                  padding={2}
                >
                  Added Movies
                </Typography>
                <Grid container spacing={2}>
                  {fetchedMovies.map((movie) => (
                    <Grid item xs={12} sm={6} key={movie._id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {movie.title}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => deleteMovieById(movie._id)}
                            fullWidth
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AdminProfile;
