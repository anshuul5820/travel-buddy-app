import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = (props) => {
  const classes = useStyles();
  // const [type, setType] = useState("restaurants");
  // const [rating, setRating] = useState("");
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      // !!props.places &&
      Array(props?.places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [props.places]);
  //this is done to make the left side list scroll to the location thats selected on map.

  return (
    <div className={classes.container}>
      <Typography variant="h4">Attractions around you</Typography>
      {props.isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={props.type}
              onChange={(event) => props.setType(event.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={props.rating}
              onChange={(event) => props.setRating(event.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {!!props.places &&
              props.places.map((place, i) => {
                return (
                  <Grid ref={elRefs[i]} item key={i} xs={12}>
                    <PlaceDetails
                      selected={Number(props.childClicked) === i}
                      refProp={elRefs[i]}
                      place={place}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
