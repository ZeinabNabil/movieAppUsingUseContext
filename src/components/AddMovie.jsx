import React, { useContext } from "react";
import { moviesContext } from "../contexts/MoviesContextProvider";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import style from "../css/addMovie.module.css";

const AddMovie = () => {
  const {
    movieData,
    handleChange,
    handleSubmit,
    openSuccessMsg,
    handleCloseSuccessMsg,
  } = useContext(moviesContext);

  return (
    <div className={style.add_movie_form}>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <TextField
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            margin="dense"
            name="title"
            value={movieData.title}
            onChange={handleChange}
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
            value={movieData.releaseDate}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Overview"
            variant="outlined"
            margin="dense"
            multiline
            name="overview"
            value={movieData.overview}
            onChange={handleChange}
          />
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button type="submit" variant="outlined" margin="dense">
              Add Movie
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
                Movie added successfully!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
