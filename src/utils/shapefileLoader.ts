// 
import * as shapefile from "shapefile";
import { useMapStore } from "../store/mapStore";

export const loadShapeFiles = async (
  progressCallback: (progress: number) => void
): Promise<void> => {
  const { setBoundaries } = useMapStore.getState();
  const areas = [
    "Abu-Dhabi",
    "Al-Madina Police Station",
    "Al-Manhal",
    "sector_in_almanhal",
  ];
  const boundaries: Record<string, any> = {};
  console.log("Loading shapefiles...");

  for (let i = 0; i < areas.length; i++) {
    const areaName = areas[i];
    try {
      progressCallback(Math.floor((i / areas.length) * 100));

      const shpUrl = `/shapefiles/${areaName}/area.shp`;
      const dbfUrl = `/shapefiles/${areaName}/area.dbf`;

      const shpRes = await fetch(shpUrl);
      const dbfRes = await fetch(dbfUrl);

      const shpBuffer = await shpRes.arrayBuffer();
      const dbfBuffer = await dbfRes.arrayBuffer();

      const source = await shapefile.open(shpBuffer, dbfBuffer);

      const features: any[] = [];
      let result = await source.read();

      while (!result.done) {
        features.push(result.value);
        result = await source.read();
      }

      const geojson = {
        type: "FeatureCollection",
        features,
      };

      switch (areaName) {
        case "Abu-Dhabi":
          boundaries["0"] = geojson;
          break;
        case "Al-Madina Police Station":
          boundaries["2"] = geojson;
          break;
        case "Al-Manhal":
          boundaries["1"] = geojson;
          break;
        default:
          boundaries[areaName] = geojson;
          break;
      }
    } catch (error) {
      console.error(`Error loading shapefile for ${areaName}:`, error);
    }
  }

  setBoundaries(boundaries);
  progressCallback(100);
};

export const loadShapefile = async (shpUrl: string, dbfUrl: string): Promise<any> => {
  try {
    const shpRes = await fetch(shpUrl);
    const dbfRes = await fetch(dbfUrl);

    const shpBuffer = await shpRes.arrayBuffer();
    const dbfBuffer = await dbfRes.arrayBuffer();

    const source = await shapefile.open(shpBuffer, dbfBuffer);

    const features: any[] = [];
    let result = await source.read();

    while (!result.done) {
      features.push(result.value);
      result = await source.read();
    }

    return {
      type: "FeatureCollection",
      features,
    };
  } catch (error) {
    console.error(`Error loading shapefile from ${shpUrl}`, error);
    throw error;
  }
};
