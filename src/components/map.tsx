'use client';

import React from 'react';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from 'react-leaflet';
import L from 'leaflet';
import {Location} from '@/services/location';

// Leaflet workaround to fix the "path" issue
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

interface MapProps {
  location: Location | null;
  trackLog: Location[];
}

export const Map: React.FC<MapProps> = ({location, trackLog}) => {
  const mapCenter = location ? [location.lat, location.lng] : [0, 0]; // Default to (0,0) if no location

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{height: '100vh', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {location && (
        <Marker position={[location.lat, location.lng]}>
          <Popup>Current Location</Popup>
        </Marker>
      )}
      {trackLog.length > 1 && (
        <Polyline
          positions={trackLog.map(loc => [loc.lat, loc.lng])}
          color="blue"
        />
      )}
    </MapContainer>
  );
};
