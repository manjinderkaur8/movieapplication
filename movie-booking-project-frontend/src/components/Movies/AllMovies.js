import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../helpers/api-helpers";
import CardLayout from "../HomePage/CardLayout";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin="auto" marginTop={10} maxWidth="1200px">
      <Typography variant="h4" textAlign="center" mb={10}>
        All Movies
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={4}>
        {movies && movies.map((movie, index) => (
          <CardLayout
            key={index}
            id={movie._id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            posterUrl={movie.posterUrl}
            description={movie.description}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllMovies;
