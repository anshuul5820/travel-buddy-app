import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import { mapStyles } from "./mapStyles";

const Map = ({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  // const [state, setstate] = useState(initialState)
  //false if min-width>600px
  // const coordinates = { lat: 0, lng: 0 };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: { mapStyles },
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography}>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={`img__${place.name}`}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
          // paper- div with bg
        ))}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coordinates.lat} lng={data.coord.lng}>
            <img
              height={100}
              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt={`img__${data.weather[0]}_icon`}
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
