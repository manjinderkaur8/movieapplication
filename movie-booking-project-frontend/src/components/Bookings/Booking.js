import { Button, FormLabel, TextField, Typography, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";


const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    // Simulating delay with setTimeout
    const delay = setTimeout(() => {
      getMovieDetails(id)
        .then((res) => {
          setMovie(res.movie);
          setLoading(false); // Once data is fetched, set loading to false
        })
        .catch((err) => console.log(err));
    }, 2000); // 2 seconds delay for example
    return () => clearTimeout(delay); // Cleanup function to clear timeout
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {loading ? ( // Display loading indicator if loading is true
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
  <img src="https://th.bing.com/th/id/OIP.rVFPTPmkZWzZeBSAwRKNZwAAAA?rs=1&pid=ImgDetMain" alt="Loading" />
</Box>

      ) : (
        movie && (
          <Fragment>
            <Typography
              padding={3}
              fontFamily="fantasy"
              variant="h4"
              textAlign={"center"}
            >
              Book Tickets Of Movie: {movie.title}
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                display={"flex"}
                justifyContent={"column"}
                flexDirection="column"
                paddingTop={3}
                width="50%"
                marginRight={"auto"}
              >
                <img
                  width="80%"
                  height={"300px"}
                  src={movie.posterUrl}
                  alt={movie.title}
                />
                <Box width={"80%"} marginTop={3} padding={2}>
                  <Typography paddingTop={2}>{movie.description}</Typography>
                  <Typography fontWeight={"bold"} marginTop={1}>
                    Starrer:
                    {movie.actors.map((actor) => " " + actor + " ")}
                  </Typography>
                  <Typography fontWeight={"bold"} marginTop={1}>
                    Release Date: {new Date(movie.releaseDate).toDateString()}
                  </Typography>
                </Box>
              </Box>
              <Box width={"50%"} paddingTop={3}>
                <form onSubmit={handleSubmit}>
                  <Box
                    padding={5}
                    margin={"auto"}
                    display="flex"
                    flexDirection={"column"}
                  >
                    <FormLabel>Seat Number</FormLabel>
                    <TextField
                      name="seatNumber"
                      value={inputs.seatNumber}
                      onChange={handleChange}
                      type={"number"}
                      margin="normal"
                      variant="standard"
                    />
                    <FormLabel>Booking Date</FormLabel>
                    <TextField
                      name="date"
                      type={"date"}
                      margin="normal"
                      variant="standard"
                      value={inputs.date}
                      onChange={handleChange}
                    />
                    <Button type="submit" sx={{ mt: 3 }}>
                      Book Now
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Fragment>
        )
      )}
    </div>
  );
};

export default Booking;
