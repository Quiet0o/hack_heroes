import React, { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geoJson from "./sample_data.json";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapRender() {
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: window.innerWidth, height: window.innerHeight }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />

      {geoJson.features.map((features) => (
        <Marker
          longitude={features.geometry.coordinates[0]}
          latitude={features.geometry.coordinates[1]}
          color="blue"
        />
      ))}
    </Map>
  );
}

export default MapRender;
