import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const TripMap = ({ places }) => {
  if (!places || places.length === 0) {
    return <div>No places to display on map.</div>;
  }
  const indiaCenter = [20.5937, 78.9629];
  const routeCoordinates = places.map(place => [Number(place.latitude),
  Number(place.longitude)]);

  return (
    <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)' }}>
      <MapContainer center={indiaCenter} zoom={5} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {places.map((place, index) => (
          <Marker key={index} position={[Number(place.latitude), Number(place.longitude)]}>
            <Popup>
              <b>{place.place}</b><br />
              {index === 0 ? "Starting Point" : `Stop ${index}`}
            </Popup>
          </Marker>
        ))}
        <Polyline pathOptions={{ color: 'blue' }} positions={routeCoordinates} />
      </MapContainer>
    </div>
  );
};
export default TripMap;