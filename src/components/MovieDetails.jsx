import React, { useContext, useEffect, useState } from "react";
import { moviesContext } from "../contexts/MoviesContextProvider";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { Button, Grid } from "@mui/material";
import style from "../css/userDetails.module.css"
import photo from "../images/nophoto.jpg"
const MovieDetails = () => {
  const { movies } = useContext(moviesContext);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setMovie(movies.find(movie => +movie.id === +id));
  }, [id, movies]);
  return (
    <div className={style.user_details}>
      {movie && (
        <Grid
          container
          spacing={2}
          className={style.grid_style}
        >
          <Grid item xs={12} lg={6} style={{ height: "100%" }}>
            {movie.poster_path ? <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title}`}
              style={{ height: "100%" }}
            /> : <img src={photo} alt="nophoto" style={{height: "100%"}}/>}
          </Grid>
          <Grid item xs={12} lg={6} style={{ height: "100%", textAlign:"left" }}>
            <h1 variant="h1" color="primary">{movie.title}</h1>
            <p style={{color:"#a0a0a0"}}><i>{movie.releaseDate}</i></p>
            <p>{movie.overview}</p>
            <Link to={`/movie/update/${movie.id}`}><Button variant="contained">Update Movie</Button></Link>
          </Grid>
        </Grid>
      )}
      {!movie && <Loading />}
    </div>
  );
};

export default MovieDetails;
