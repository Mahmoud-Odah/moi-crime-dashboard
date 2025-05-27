import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapStore } from '../../store/mapStore';
import { areaCoordinates } from '../../data/mapData';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapController: React.FC = () => {
  const map = useMap();
  const { currentArea, areas } = useMapStore();
  const prevAreaRef = useRef(currentArea);

  useEffect(() => {
    if (currentArea !== prevAreaRef.current && areas[currentArea]) {
      const { center, zoom } = areaCoordinates[currentArea];
      map.flyTo(center, zoom, {
        duration: 2,
        easeLinearity: 0.25,
      });
      prevAreaRef.current = currentArea;
    }
  }, [currentArea, areas, map]);

  return null;
};

const CrimeMap: React.FC = () => {
  const { areas, currentArea, boundaries } = useMapStore();

  const getStyleForArea = (areaId: string) => {
    const isActive = currentArea === areaId;
    return {
      fillColor: isActive ? '#ff4757' : '#3498db',
      weight: isActive ? 3 : 2,
      opacity: isActive ? 1 : 0.7,
      color: isActive ? '#d63031' : '#2980b9',
      fillOpacity: isActive ? 0.3 : 0.2,
    };
  };

  return (
    <MapContainer
      center={areaCoordinates[0].center}
      zoom={areaCoordinates[0].zoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController />
      
      {Object.entries(areas).map(([id, area]) => (
        <React.Fragment key={id}>
          {boundaries[id] && (
            <GeoJSON 
              data={boundaries[id]} 
              style={() => getStyleForArea(id)}
            />
          )}
          <Marker position={areaCoordinates[parseInt(id)].center}>
            <Popup>
              <strong>{area.name}</strong>
              <br />
              {area.shortDescription}
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default CrimeMap;