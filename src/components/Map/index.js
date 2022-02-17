import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import styles from "./Map.module.scss";

export default function Map({ latitude, longitude }) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: 300,
    latitude,
    longitude,
    zoom: 12,
  });

  // // Only rerender markers if props.data has cshanged
  // const markers = React.useMemo(
  //   () => (
  //     <Marker longitude={longitude} latitude={latitude}>
  //       <span>📍</span>
  //     </Marker>
  //   ),
  //   []
  // );
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      className={styles.container}
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiZW1hZGkiLCJhIjoiY2tkdzFhMWk4MHE4MzJxcGlsamF5dGdiNSJ9.xRRbd6yqn_NKACCbIzfusA"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker longitude={longitude} latitude={latitude}>
        <span>📍</span>
      </Marker>
    </ReactMapGL>
  );
}
