import React, { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import geoJson from "./sample_data.json";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapRender() {

  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState,latitude: lat, longitude: long });
  };

  const handleAddNewPin = (e) => {

    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: window.innerWidth, height: window.innerHeight }}

      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      onDblClick={handleAddNewPin}
      onViewStateChange={(viewState) => setViewState(viewState)}
    >
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />

      {geoJson.features.map((features,index) => (
        <>
        <Marker
          key={index}
          longitude={features.geometry.coordinates[0]}
          latitude={features.geometry.coordinates[1]}
          color="blue"
          style={{cursor:"pointer"}}
          onClick={() => handleMarkerClick( features.id,features.geometry.coordinates[1], features.geometry.coordinates[0])}
        >
        </Marker>
        {features.id === currentPlaceId && (
         <Popup
         key={features.id}
         longitude={features.geometry.coordinates[0]}
         latitude={features.geometry.coordinates[1]}
         closeButton={true}
         closeOnClick={false}
         onClose={() => setCurrentPlaceId(null)}
         anchor="left"
        >
          <label> { features.properties.title}</label>
        </Popup>
        )}
        </>
      ))}
      {newPlace && (
         <>
         <Marker
           latitude={newPlace.lat}
           longitude={newPlace.long}

         >

         </Marker>
         </>
      )}
    </Map>
  );
}

export default MapRender;
