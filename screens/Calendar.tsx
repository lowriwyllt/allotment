import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { AllPlantProps } from "../types/Plants.types";
type Marked = {
  [date: string]: {
    periods: { startingDay: boolean; endingDay: boolean; color: string }[];
  };
};
// const testDates = [
//   {
//     event: "sowing window",
//     sowingWindowDate: "2023-05-01",
//     numberOfDays: 10,
//   },
//   {
//     event: "harvesting window",
//     fromDate: "2023-05-08",
//     numberOfDays: 12,
//   },
// ];
const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

interface Sowing {
  event: string;
  sowingWindow: string;
  numberOfDays: number;
}

interface Harvest {
  event: string;
  fromDate: string;
  numberOfDays: number;
}

const CalendarSinglePlant = ({ plant }: AllPlantProps): JSX.Element => {
  const {
    maxDaysUntilHarvest,
    minDaysUntilHarvest,
    sowingStartDate,
    sowingWindowDays,
    name,
  } = plant;

  let harvestFromDate = new Date(`${currentYear}${sowingStartDate}`);
  harvestFromDate.setDate(harvestFromDate.getDate() + minDaysUntilHarvest);

  const testDates = [
    {
      event: `sowing-window`,
      fromDate: `${currentYear}${sowingStartDate}`,
      numberOfDays: sowingWindowDays,
    },
    {
      event: "harvest-window",
      fromDate: `${harvestFromDate.getFullYear()}-${String(
        harvestFromDate.getMonth() + 1
      ).padStart(2, "0")}-${harvestFromDate.getDate()}`,
      numberOfDays:
        maxDaysUntilHarvest - minDaysUntilHarvest + sowingWindowDays,
    },
  ];

  console.log(testDates);

  const getMarked = () => {
    let marked: Marked = {};
    let color = "";
    testDates.forEach(({ event, fromDate, numberOfDays }) => {
      if (event === "sowing window") {
        color = "blue";
      } else if (event === "harvesting window") {
        color = "green";
      }
      const from = new Date(fromDate);
      const to = new Date(
        from.getTime() + (numberOfDays - 1) * 24 * 60 * 60 * 1000
      );
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
  // const testDates = [
  //   {
  //     event: "sewing window",
  //     fromDate: "2023-05-01",
  //     toDate: "2023-05-13",
  //   },
  //   {
  //     event: "harvesting window",
  //     fromDate: "2023-06-11",
  //     toDate: "2023-06-26",
  //   },
  // ];
  // const CalendarSinglePlant = (): JSX.Element => {
  //   const getMarked = () => {
  //     let marked: Marked = {};
  //     let color = "";
  //     testDates.forEach(({ event, fromDate, toDate }) => {
  //       if (event === "sewing window") {
  //         color = "blue";
  //       } else if (event === "harvesting window") {
  //         color = "green";
  //       }
  //       const from = new Date(fromDate);
  //       const to = new Date(toDate);
  //       const currentDate = new Date(from);
  //       while (currentDate <= to) {
  //         const year = currentDate.getFullYear();
  //         const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //         const day = String(currentDate.getDate()).padStart(2, "0");
  //         if (!marked[`${year}-${month}-${day}`]) {
  //           marked[`${year}-${month}-${day}`] = {
  //             periods: [],
  //           };
  //         }
  //         marked[`${year}-${month}-${day}`].periods.push({
  //           startingDay: currentDate.getTime() === from.getTime(),
  //           endingDay: currentDate.getTime() === to.getTime(),
  //           color: color, // Set your desired color here
  //         });
  //         currentDate.setDate(currentDate.getDate() + 1);
  //       }
  //     });
  //     console.log(marked);

  //     return marked;
  //   };
  //   console.log(currentMonth);
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        initialDate={`${currentYear}-${currentMonth}-01`}
        markingType="multi-period"
        markedDates={getMarked()}
        style={{
          borderWidth: 1,
          borderColor: "grey",
          height: 350,
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
  },
});
export default CalendarSinglePlant;
