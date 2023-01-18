import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts.js";
import Paginatation from "../Pagination.js";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper  elevation={6} >
              <Paginatation/>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
