import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import style from "../css/addMovie.module.css";
import { useContext, useEffect } from "react";
import { moviesContext } from "../contexts/MoviesContextProvider";
import { useParams } from "react-router-dom";
const UpdateMovie = () => {
  const {
    movies,
    updatedMovie,
    setUpdatedMovie,
    handleUpdate,
    handleUpdateChange,
    openSuccessMsg,
    handleCloseSuccessMsg,
  } = useContext(moviesContext);

  const { id } = useParams();

  useEffect(() => {
    setUpdatedMovie(movies.find((movie) => +movie.id === +id));
  }, [id, setUpdatedMovie, movies]);

  return (
    <div className={style.add_movie_form}>
      <h1>Update Movie</h1>
      {updatedMovie && (
        <form onSubmit={handleUpdate}>
          <div className={style.inputs}>
            <TextField
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              margin="dense"
              name="title"
              value={updatedMovie.title}
              onChange={handleUpdateChange}
            />
            <TextField
              type="date"
              required
              id="outlined-basic"
              label="Release date"
              variant="outlined"
              margin="dense"
              name="releaseDate"
              InputLabelProps={{
                shrink: true,
              }}
              value={updatedMovie.releaseDate}
              onChange={handleUpdateChange}
            />

            <TextField
              required
              id="outlined-basic"
              label="Overview"
              variant="outlined"
              margin="dense"
              multiline
              name="overview"
              value={updatedMovie.overview}
              onChange={handleUpdateChange}
            />
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Button type="submit" variant="outlined" margin="dense">
                Update Movie
              </Button>
              <Snackbar
                open={openSuccessMsg}
                autoHideDuration={6000}
                onClose={handleCloseSuccessMsg}
              >
                <Alert
                  onClose={handleCloseSuccessMsg}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Movie updated successfully!
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateMovie;
