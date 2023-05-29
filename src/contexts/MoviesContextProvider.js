import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const moviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(null);
  const [movieData, setMovieData] = useState({
    title: "",
    releaseDate: "",
    overview: "",
  });
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);
  // Navigation
  const navigate = useNavigate();

  // Handle msg appeat
  const handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessMsg(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Delete movie
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this movie?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/movies/${id}`)
          .then((res) => {
            Swal.fire("Deleted successfully", "", "success");
            setMovies(movies.filter((movie) => movie.id !== id));
          })
          .catch((err) => Swal.fire("Changes are not saved", "", "info"));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // Handle on change event
  const handleChange = (event) => {
    setMovieData({ ...movieData, [event.target.name]: event.target.value });
  };

  const handleUpdateChange = (event) => {
    setUpdatedMovie({
      ...updatedMovie,
      [event.target.name]: event.target.value,
    });
  };

  // Add moviw
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/movies", movieData)
      .then(() => {
        setMovies((oldMovies) => [...oldMovies, movieData]);
        setMovieData({ title: "", releaseDate: "", overview: "" });
        setOpenSuccessMsg(true);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
      );
  };

  // Update movie
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(updatedMovie);
    axios
      .put(`http://localhost:3000/movies/${updatedMovie.id}`, updatedMovie)
      .then(() => {
        setMovies((oldMovies) =>
          oldMovies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie
          )
        );
        setOpenSuccessMsg(true);
        setTimeout(() => {
          navigate(`/movie/${updatedMovie.id}`);
        }, 2000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <moviesContext.Provider
      value={{
        movies,
        movieData,
        handleChange,
        handleSubmit,
        openSuccessMsg,
        handleCloseSuccessMsg,
        setUpdatedMovie,
        updatedMovie,
        handleUpdateChange,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </moviesContext.Provider>
  );
};

export default MoviesContextProvider;
