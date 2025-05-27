import { create } from 'zustand';
import { LatLngTuple } from 'leaflet';

interface Area {
  id: string;
  name: string;
  summary: string;
  timestamp?: string;
  shortDescription: string;
  isArabic: boolean;
  chartData?: Array<{ name: string; value: number; color?: string }>;
}

interface Boundaries {
  [key: string]: any; // GeoJSON data
}

interface MapState {
  areas: Record<string, Area>;
  boundaries: Boundaries;
  currentArea: string;
  isLoading: boolean;
  setAreas: (areas: Record<string, Area>) => void;
  setBoundaries: (boundaries: Boundaries) => void;
  setCurrentArea: (areaId: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  areas: {
    '0': {
      id: '0',
      name: 'Abu Dhabi',
      summary: `
        <p class="text-sm">يقدم هذا الملخص لمحة سريعة عن أهم الجرائم المقلقة التي حدثت في مدينة ابوظبي في 2024-7-6</p>
        <h5 class="font-bold mt-3 mb-2">الجرائم المقلقة:</h5>
        <p class="font-bold mt-2">السرقة:</p>
        <p class="text-sm">تم الإبلاغ عن 5 حادثة سرقة في مدينة خليفة، حيث كانت اغلب عملايات السرقة في فيلل مستقلة لا يزال المشتبه بهم طلقاء.</p>
        <p class="font-bold mt-2">الاعتداء:</p>
        <p class="text-sm">تعرض شخص واحد من الجالية النيجيرية للإعتداء في منطقة المنهل أصيب الضحية بجروح خطيرة تم القبض على المشتبه به</p>
        <p class="font-bold mt-2">المخدرات:</p>
        <p class="text-sm">ضبطت الشرطة 1 كيلو غرام من مخدرات الماريجوانا في منطقة مصفح في المربع رقم 15، وهذه ليست المرة الأولى حيث لوحظ انتشار لجرائم المخدرات في هذه لمنطقة تم القبض على 3 أشخاص من الجالية الأوغندية.</p>
      `,
      timestamp: '2024-7-6',
      shortDescription: 'Crime summary for Abu Dhabi city',
      isArabic: true,
      chartData: [
        { name: 'السرقة', value: 5, color: '#ff6b6b' },
        { name: 'الاعتداء', value: 1, color: '#ff9f43' },
        { name: 'المخدرات', value: 3, color: '#54a0ff' }
      ]
    },
    '1': {
      id: '1',
      name: 'Al Manhal Sector',
      summary: `
        <p class="text-sm">تعد هذه المنطقة من أكثر المناطق الساخنة في منطقة المنهل، حيث تنتشر فيها مختلف الأنواع من الجرائم، وقد لوحظ في الأسبوعين السابقين انتشار جريمة السرقة باستخدام اسلوب النشل والتهديد بين اوساط الجالية الفليبينية وكان اغلب الضحايا هم من سكان تلك المناطق</p>
        <p class="text-sm mt-3">لم تنتشر هذه الجرائم في السابق بين افراد هذه الجالية وهي ظاهرة مستحدثة</p>
      `,
      shortDescription: 'Hot spot in Al Manhal area',
      isArabic: true,
      chartData: [
        { name: 'النشل', value: 8, color: '#ff6b6b' },
        { name: 'التهديد', value: 6, color: '#ff9f43' }
      ]
    },
    '2': {
      id: '2',
      name: 'Al Madinah Police Station',
      summary: `
        <p class="text-sm">يعد مركز شرطة المدينة الشامل من اكثر المراكز اهمية في منطقة رأس الخيمة، حيث يتلقى بمعدل 10 بلاغات مقلقة اسبوعيا، وقد لوحظ انه بالأونة الأخيرة، تلقى المركز بلاغات مقلقة بشكل متزايد في منطقة الاختصاص التابعة له وهي منطقة العرقوب. حيث لوحظ تزايد في استخدام الاساليب الأجرامية الأتية:</p>
        <ul class="list-disc list-inside mt-2 mb-2 text-sm">
          <li>التعرض لمركبة متحركة</li>
          <li>الفتح بإستعمال مفاتيح مصطنعة</li>
          <li>الابتزاز</li>
        </ul>
      `,
      shortDescription: 'Key police station in Ras Al Khaimah',
      isArabic: true,
      chartData: [
        { name: 'التعرض لمركبة', value: 4, color: '#ff6b6b' },
        { name: 'مفاتيح مصطنعة', value: 5, color: '#ff9f43' },
        { name: 'الابتزاز', value: 3, color: '#54a0ff' }
      ]
    }
  },
  boundaries: {},
  currentArea: '0',
  isLoading: false,
  setAreas: (areas) => set({ areas }),
  setBoundaries: (boundaries) => set({ boundaries }),
  setCurrentArea: (areaId) => set({ currentArea: areaId }),
  setLoading: (isLoading) => set({ isLoading }),
}));