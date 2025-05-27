import React from 'react';
import { Button } from 'primereact/button';
import { useMapStore } from '../../store/mapStore';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const AreaNavigation: React.FC = () => {
  const { areas, currentArea, setCurrentArea } = useMapStore();
  
  const goToNextArea = () => {
    const areaIds = Object.keys(areas).map(Number);
    const currentIndex = areaIds.indexOf(Number(currentArea));
    const nextIndex = (currentIndex + 1) % areaIds.length;
    setCurrentArea(String(areaIds[nextIndex]));
  };
  
  const goToPrevArea = () => {
    const areaIds = Object.keys(areas).map(Number);
    const currentIndex = areaIds.indexOf(Number(currentArea));
    const prevIndex = (currentIndex - 1 + areaIds.length) % areaIds.length;
    setCurrentArea(String(areaIds[prevIndex]));
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
        Area Navigation
      </h2>
      
      <div className="flex items-center justify-between mb-4">
        <Button 
          icon={<ChevronLeft className="w-4 h-4" />}
          className="p-button-outlined p-button-rounded"
          onClick={goToPrevArea}
          aria-label="Previous area"
        />
        
        <span className="text-blue-800 font-medium">
          {areas[currentArea]?.name || 'Area'}
        </span>
        
        <Button 
          icon={<ChevronRight className="w-4 h-4" />}
          className="p-button-outlined p-button-rounded"
          onClick={goToNextArea}
          aria-label="Next area"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(areas).map(([id, area]) => (
          <Button
            key={id}
            label={area.name}
            className={`p-button-sm ${currentArea === id ? 'p-button-raised' : 'p-button-outlined'}`}
            onClick={() => setCurrentArea(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AreaNavigation;