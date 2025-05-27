import React, { useState, useEffect, useRef } from 'react';
import CrimeMap from '../components/map/CrimeMap';
import AreaNavigation from '../components/map/AreaNavigation';
import CrimeSummary from '../components/map/CrimeSummary';
import { useMapStore } from '../store/mapStore';
import { loadShapeFiles } from '../utils/shapefileLoader';

const MapPage: React.FC = () => {
  const { currentArea, isLoading, setLoading } = useMapStore();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadAllShapefiles = async () => {
      setLoading(true);
      try {
        await loadShapeFiles(setLoadingProgress);
      } catch (error) {
        console.error('Error loading shapefiles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllShapefiles();
  }, [setLoading]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-64 bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="text-gray-700">Loading map data... {loadingProgress}%</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Interactive Crime Summary Map</h1>
        <p className="text-gray-600">
          Explore crime data across different areas with interactive visualizations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden h-full">
          <CrimeMap />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
          <AreaNavigation />
          <div className="mt-4 flex-1 overflow-auto">
            <CrimeSummary areaId={currentArea} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;