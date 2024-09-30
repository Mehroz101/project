import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import "../styles/MapBox.css";
// import { useSearch } from "../context/SearchContext"; // Update the path as necessary
import { useParams } from 'react-router-dom';

const TOKEN = "pk.eyJ1IjoibWVocm96ZmFyb29xIiwiYSI6ImNtMGc2ODJqZzE0dDkyanFyamlwdmQ3eTIifQ.tKoAqHa7Fyq96aj59q4vlw";

const MapBox = () => {
  // const { searchQuery } = useSearch(); // Use the context
  const {searchInput} = useParams()
  const [viewPort, setViewPort] = useState({
    latitude: 30.4390,
    longitude: 72.3552,
    zoom: 12,
  });
  const [markers, setMarkers] = useState([]);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mehrozfarooq/cm0g6qi11000z01pihk088cvz',
      center: [viewPort.longitude, viewPort.latitude],
      zoom: viewPort.zoom
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([viewPort.longitude, viewPort.latitude]);
      mapRef.current.setZoom(viewPort.zoom);
    }
  }, [viewPort]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (searchInput.trim() === "") return;

      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchInput
          )}.json`,
          {
            params: {
              access_token: TOKEN,
              limit: 1,
            },
          }
        );

        const [longitude, latitude] = response.data.features[0].center;

        setViewPort({
          latitude,
          longitude,
          zoom: 13,
        });

        const nearbyLocations = [
          { lat: latitude, long: longitude },
          { lat: latitude + 0.01, long: longitude + 0.01 }, // Example nearby location
          { lat: latitude - 0.01, long: longitude - 0.01 }  // Example nearby location
        ];

        setMarkers(nearbyLocations);

        if (mapRef.current) {
          mapRef.current.setCenter([longitude, latitude]);
          mapRef.current.setZoom(9);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [searchInput]);

  useEffect(() => {
    if (markers.length > 0 && mapRef.current) {
      markers.forEach(marker => {
        new mapboxgl.Marker()
          .setLngLat([marker.long, marker.lat])
          .addTo(mapRef.current);
      });
    }
  }, [markers]);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default MapBox;
