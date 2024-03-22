import React, { useState, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import L from "leaflet";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapControl({ position, zoom }) {
  const [bounds, setBounds] = useState(null);

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={[10.777278, 106.695389]}
        zoom={zoom || 0}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <VectorBasemapLayer
          apiKey="AAPKc84180eb554748db8f9c5610ea258426GjMeZS-ZZoTcACKRfs7uvF3tG2wQHkLPDjqlq2KXIYiqwdOADtwgFlq4g72h0mBn"
          name="ArcGIS:ChartedTerritory"
        />
        {bounds && <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />}
      </MapContainer>
    ),
    [bounds, zoom]
  );

  const onBoundsChange = useCallback((e) => {
    setBounds(e.target.getBounds());
  }, []);

  return (
    <div
      className={
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
      }
    >
      <div className="leaflet-control leaflet-bar">
        <MapContainer
          style={{ display: "none" }}
          center={[10.777278, 106.695389]}
          zoom={zoom || 0}
          zoomControl={false}
          whenCreated={(map) => map.on("move", onBoundsChange)}
        />
        {minimap}
      </div>
    </div>
  );
}

export default MinimapControl;
