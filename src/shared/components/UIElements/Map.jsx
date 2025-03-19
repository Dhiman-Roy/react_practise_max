import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = ({ center, zoom }) => {
  const mapContainer = useRef(null);
  console.log(center);
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", // Default style
      center: center, // Center from props
      zoom: zoom, // Zoom from props
    });

    // Add a marker
    new maplibregl.Marker().setLngLat(center).addTo(map);

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl());

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [center, zoom]); // Reinitialize if center or zoom changes

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
