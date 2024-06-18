import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest, getAllMovies, deleteMovie } from "../../api-helpers/api-helpers";
import { adminActions } from "../../store";
import AuthForm from "./AuthForm";

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies)) 
      .catch((err) => console.log(err));
  }, []);

  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    deleteMovie(id)
      .then(() => setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id))) // Assuming movie objects have an `_id` property
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
      <h2>Added Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title}
            <button className="btn btn-primary" onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
