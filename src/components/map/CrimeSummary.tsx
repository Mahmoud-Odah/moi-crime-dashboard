import React from 'react';
import { useMapStore } from '../../store/mapStore';
import CrimeChart from './CrimeChart';
import { AlertTriangle, FileBadge, Clock } from 'lucide-react';

interface CrimeSummaryProps {
  areaId: string;
}

const CrimeSummary: React.FC<CrimeSummaryProps> = ({ areaId }) => {
  const { areas } = useMapStore();
  const area = areas[areaId];

  if (!area) {
    return <div>No area selected</div>;
  }

  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
        <h3 className="text-lg font-bold text-gray-800">{area.name} Crime Summary</h3>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center">
        <Clock className="w-5 h-5 text-blue-600 mr-2" />
        <span className="text-sm text-blue-800">
          {area.timestamp || 'Recent data'}
        </span>
      </div>
      
      <div dir={area.isArabic ? 'rtl' : 'ltr'} className={area.isArabic ? 'font-arabic' : ''}>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
          <h4 className="text-md font-semibold mb-2 text-gray-800 flex items-center">
            <FileBadge className="w-4 h-4 mr-2 text-blue-600" />
            {area.isArabic ? 'ملخص الجرائم' : 'Crime Summary'}
          </h4>
          <div 
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: area.summary }}
          />
        </div>
      </div>
      
      {area.chartData && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h4 className="text-md font-semibold mb-3 text-gray-800">
            {area.isArabic ? 'تحليل الجرائم' : 'Crime Analysis'}
          </h4>
          <CrimeChart data={area.chartData} />
        </div>
      )}
    </div>
  );
};

export default CrimeSummary;