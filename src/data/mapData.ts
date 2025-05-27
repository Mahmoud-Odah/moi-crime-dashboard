import { LatLngTuple } from 'leaflet';

interface AreaCoordinate {
  center: LatLngTuple;
  zoom: number;
}

export const areaCoordinates: AreaCoordinate[] = [
  // Abu Dhabi coordinates
  {
    center: [24.4667, 54.3667],
    zoom: 11
  },
  // Al Manhal Sector coordinates
  {
    center: [24.4531, 54.3773],
    zoom: 14
  },
  // Al Madinah Police Station coordinates
  {
    center: [25.787720288922227, 55.92128687718971],
    zoom: 15
  }
];

export const mockGeoJSONData = {
  'abu-dhabi': {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [54.2667, 24.3667],
              [54.4667, 24.3667],
              [54.4667, 24.5667],
              [54.2667, 24.5667],
              [54.2667, 24.3667]
            ]
          ]
        }
      }
    ]
  },
  'al-manhal': {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [54.3673, 24.4431],
              [54.3873, 24.4431],
              [54.3873, 24.4631],
              [54.3673, 24.4631],
              [54.3673, 24.4431]
            ]
          ]
        }
      }
    ]
  },
  'al-madinah': {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [55.9112, 25.7877],
              [55.9312, 25.7877],
              [55.9312, 25.7977],
              [55.9112, 25.7977],
              [55.9112, 25.7877]
            ]
          ]
        }
      }
    ]
  }
};