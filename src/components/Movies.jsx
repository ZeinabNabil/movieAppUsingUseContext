import { useContext } from "react";
import Movie from "./Movie";
import { Grid } from "@mui/material";
import { moviesContext } from "../contexts/MoviesContextProvider";
import Loading from "./Loading";

const Movies = () => {
  const {movies} = useContext(moviesContext)
  return (
      <div className="movies">
        <Grid container spacing={2}>
          {movies ? (
            movies.map((movie) => {
              return (
                <Grid key={movie.id} item xs={12} md={6} lg={3}>
                  <Movie {...movie} />
                </Grid>
              );
            })
          ) : (
            <Loading />
          )}
        </Grid>
      </div>
  );
};

export default Movies;
