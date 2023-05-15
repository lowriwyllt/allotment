export type Marked = {
  [date: string]: {
    periods: { startingDay: boolean; endingDay: boolean; color: string }[];
  };
};

export type CalenderDateType = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};
