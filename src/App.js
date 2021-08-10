//env names in react must start with REACT_APP
import React, { useEffect, useState } from "react";

import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData, getWeatherData } from "./api/index";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  //top-right, bottom left
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces =
      !!places && places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    // console.log(coordinates, bounds);
    if (bounds.ne && bounds.sw) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        setWeatherData(data);
      });

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setRating("");
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={!!filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            rating={rating}
            type={type}
            setRating={setRating}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={!!filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
