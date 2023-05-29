import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useContext } from "react";
import { moviesContext } from "../contexts/MoviesContextProvider";
import { Link } from "react-router-dom";
import photo from "../images/nophoto.jpg";

export default function Movie({ id, title, releaseDate, poster_path }) {
  const img = "https://image.tmdb.org/t/p/w500/";

  const { handleDelete } = useContext(moviesContext);

  return (
    <Card>
      {poster_path ? (
        <CardMedia
          sx={{ height: 600 }}
          image={`${img}${poster_path}`}
          title={`${title}`}
        />
      ) : (
        <CardMedia sx={{ height: 600 }} image={photo} title="nophoto" />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`movie/${id}`}>
          <Button>Read More</Button>
        </Link>
        <Button
          onClick={() => {
            handleDelete(id);
          }}
          color="error"
        >
          Delete movie
        </Button>
      </CardActions>
    </Card>
  );
}
