//PLANT TYPE FOR FETCHING ALL
export type PlantTypeForAll = {
  name: string;
  img: string;
};

//PLANT TYPE ALL FIELDS
export type PlantType = {
  img: string;
  maxDaysUntilHarvest: number;
  minDaysUntilHarvest: number;
  minTempCelcius: number;
  name: string;
  scientificName: string;
  sowingInstructions: string[];
  sowingStartDate: string;
  sowingWindowInDays: number;
  sunLight: string;
  wateringFrequencyInDays: number;
};

export type PlantProps = {
  plant: {
    name: string;
    img: string;
  };
};

export type AllPlantProps = {
  plant: {
    img: string;
    maxDaysUntilHarvest: number;
    minDaysUntilHarvest: number;
    minTempCelcius: number;
    name: string;
    scientificName: string;
    sowingInstructions: string[];
    sowingStartDate: string;
    sowingWindowInDays: number;
    sunLight: string;
    wateringFrequencyInDays: number;
  };
};
