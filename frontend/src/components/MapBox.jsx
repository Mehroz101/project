import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import "../styles/MapBox.css";
import { useParams } from "react-router-dom";
import { calculateDistance } from "../parkingOwner/components/Functions";

const TOKEN =
  "pk.eyJ1IjoibWVocm96ZmFyb29xIiwiYSI6ImNtMGc2ODJqZzE0dDkyanFyamlwdmQ3eTIifQ.tKoAqHa7Fyq96aj59q4vlw";

const MapBox = ({ spaces, onShowDetail, getSpace }) => {
  const { searchInput } = useParams(); // searchInput from URL params
  const [viewPort, setViewPort] = useState({
    latitude: 30.439,
    longitude: 72.3552,
    zoom: 12,
  });
  const [searchLocation, setSearchLocation] = useState(null); // State to store user's search location
  const [marker, setMarkers] = useState(null); // State to store user's search location
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const searchMarkerRef = useRef(null); // Reference to the search location marker
  const spaceMarkersRef = useRef([]); // Reference to store space markers

  // Filter locations within 5 km
  const getNearbySpaces = (userLat, userLong) => {
    return spaces.filter((space) => {
      const distance = calculateDistance(
        userLat,
        userLong,
        space.latitude,
        space.longitude
      );
      return distance <= 5; // Only show spaces within 5 km
    });
  };

  // Initialize Mapbox only once
  useEffect(() => {
    mapboxgl.accessToken = TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mehrozfarooq/cm0g6qi11000z01pihk088cvz",
      center: [viewPort.longitude, viewPort.latitude],
      zoom: viewPort.zoom,
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

  // Fetch user's search location only on search input change
  useEffect(() => {
    const fetchLocation = async () => {
      if (!searchInput.trim()) return;

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
        setSearchLocation({ latitude, longitude }); // Save user's search location
        getSpace({ latitude, longitude });
        // Update viewport to user's search location
        setViewPort({
          latitude,
          longitude,
          zoom: 13,
        });

        // Remove previous search location marker if it exists
        if (searchMarkerRef.current) {
          searchMarkerRef.current.remove();
        }

        // Add marker for the user's search location
        const searchMarker = new mapboxgl.Marker({ color: "green" }) // Green marker for user's location
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setText("Your Location"))
          .addTo(mapRef.current);

        // Save reference to the marker to remove later
        searchMarkerRef.current = searchMarker;
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation(); // Trigger location fetch when searchInput changes
  }, [searchInput]);

  // Update markers when spaces change
  useEffect(() => {
    if (!searchLocation) return;

    const nearbySpaces = getNearbySpaces(
      searchLocation.latitude,
      searchLocation.longitude
    );
    setMarkers(nearbySpaces);

    // Clear existing space markers
    clearSpaceMarkers();

    // Add markers for nearby spaces
    nearbySpaces.forEach((space) => {
      const spaceMarker = new mapboxgl.Marker()
        .setLngLat([space.longitude, space.latitude])
        .setPopup(new mapboxgl.Popup().setText(space.title)) // Add popup with space name
        .addTo(mapRef.current);

      const markerElement = spaceMarker.getElement();
      markerElement.style.cursor = "pointer"; // Change cursor to pointer

      // Add click event listener to marker
      markerElement.addEventListener("click", () => {
        onShowDetail(space._id); // Call onShowDetail with the space ID
      });
      // Add marker to reference array
      spaceMarkersRef.current.push(spaceMarker);
    });
  }, [spaces, searchLocation]);

  // Function to clear space markers
  const clearSpaceMarkers = () => {
    spaceMarkersRef.current.forEach((marker) => marker.remove());
    spaceMarkersRef.current = []; // Clear the reference array
  };

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }}></div>
  );
};

export default MapBox;
