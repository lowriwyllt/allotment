import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
type Marked = {
  [date: string]: {
    periods: { startingDay: boolean; endingDay: boolean; color: string }[];
  };
};
const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
const testDates = [
  {
    event: "sewing window",
    fromDate: "2023-05-01",
    toDate: "2023-05-13",
  },
  {
    event: "harvesting window",
    fromDate: "2023-05-11",
    toDate: "2023-06-26",
  },
];
const CalendarSinglePlant = (): JSX.Element => {
  const getMarked = () => {
    let marked: Marked = {};
    let color = "";
    testDates.forEach(({ event, fromDate, toDate }) => {
      if (event === "sewing window") {
        color = "blue";
      } else if (event === "harvesting window") {
        color = "green";
      }
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const currentDate = new Date(from);
      while (currentDate <= to) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        if (!marked[`${year}-${month}-${day}`]) {
          marked[`${year}-${month}-${day}`] = {
            periods: [],
          };
        }
        marked[`${year}-${month}-${day}`].periods.push({
          startingDay: currentDate.getTime() === from.getTime(),
          endingDay: currentDate.getTime() === to.getTime(),
          color: color, // Set your desired color here
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return marked;
  };
  console.log(currentYear);
  console.log(currentMonth);
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        initialDate={`${currentYear}-${currentMonth}-01`}
        markingType="multi-period"
        markedDates={getMarked()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default CalendarSinglePlant;
