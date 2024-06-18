import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import "../components/HomePage.css"; // Import the CSS file for additional styling

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" margin="auto" marginTop={0} padding={0}>
      <Box className="animation-container"> {/* Animation block */}
        <Typography variant="h4" className="animated-text">
          Welcome to our movie platform! 
        </Typography>
      </Box>
      <Box margin="auto" width="100%" height="100vh" borderRadius={1} overflow="hidden" boxShadow={3}>
        <img
          src="https://cdn.mos.cms.futurecdn.net/011d447d13b33cc754dd5b076af1344b-1200-80.jpg"
          alt="Movies"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box padding={5} margin="auto" textAlign="center">
        <Typography variant="h4" color="#2b2d42">
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        padding={2}
      >
        {movies.slice(0, 4).map((movie) => (
          <Card key={movie._id} sx={{ maxWidth: 300 }}>
            <CardActionArea component={Link} to={`/booking/${movie._id}`}>
              <img src={movie.posterUrl} alt={movie.title} style={{ width: "100%", height: "300%", objectFit: "cover" }} />
              <CardContent>
                <Typography gutterBottom variant="h6" color="#2b2d42">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginTop={3}>
        <Button
          component={Link}
          to="/movies"
          variant="contained"
          sx={{ backgroundColor: "#2b2d42", color: "#fff", "&:hover": { backgroundColor: "#4a4e67" } }}
        >
          View All Movies
        </Button>
      </Box>
      <Box mt={2} bgcolor="#FFDE59" py={6} textAlign="center">
  <Typography variant="body1" >
    Welcome to our movie platform! <br></br>
    Dive into a world of endless entertainment with our vast collection of blockbuster movies. 
    Whether you're a cinephile searching for classic masterpieces or a casual viewer looking for the latest releases, 
    our platform has something for everyone.
    Explore diverse genres, from action-packed thrillers to heartwarming dramas and everything in between.
    With user-friendly navigation and seamless booking experience, 
    booking your favorite movies has never been easier. 
    Join our community of movie enthusiasts and embark on a cinematic journey like never before!
  </Typography>
</Box>

<Box padding={5} margin="auto" textAlign="center">
        <Typography variant="h4" color="#2b2d42">
          Trending Movies
        </Typography>
      </Box>
      <Box
        margin="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        padding={2}
      >
        {movies.slice(0, 4).map((movie) => (
          <Card key={movie._id} sx={{ maxWidth: 300 }}>
            <CardActionArea component={Link} to={`/booking/${movie._id}`}>
              <img src={movie.posterUrl} alt={movie.title} style={{ width: "100%", height: "300%", objectFit: "cover" }} />
              <CardContent>
                <Typography gutterBottom variant="h6" color="#2b2d42">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      {/* Footer */}
      <Box mt={1} bgcolor="#2b2d42" color="#fff" py={3} textAlign="center">
        <Typography variant="body1">Movie Webiste &copy; 2024</Typography>
      </Box>
     

    </Box>
  );
};

export default HomePage;
