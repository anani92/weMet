import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import { Collapse } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 545,
    background: "rgba(0,0,0,0.5)",
    margin: "20px",
  },
  media: {
    height: 340,
  },

  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1.1rem",
    color: "#ddd",
  },
  link: {
    textDecoration: "none",
  },
});

export default function MediaCard({ place, checked }) {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={place.imageUrl}
          title="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.title}
          >
            {place.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.desc}
          >
            {place.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <a className={classes.link} href="/login">
              Like
            </a>
          </Button>
          <Button size="small">
            <a className={classes.link} onClick={() => navigate("/login")}>
              Comment
            </a>
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  );
}
