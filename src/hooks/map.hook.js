import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useMap() {
  const [userLocation, setUserLocation] = useState({
    latitude: 57.7089,
    longitude: 11.9746,
  });

  var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        bdcApi =
          bdcApi +
          "?latitude=" +
          res.coords.latitude +
          "&longitude=" +
          res.coords.longitude +
          "&localityLanguage=en";

        axios.get(bdcApi).then((res) => {
          setLocation(res.data?.city);
        });

        setUserLocation({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
        console.log(res.coords);
      });
    }
  }, []);
  return { userLocation, setUserLocation };
}
