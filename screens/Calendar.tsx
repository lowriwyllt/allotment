import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar, ExpandableCalendar } from "react-native-calendars";
import { AllPlantProps } from "../types/Plants.types";
type Marked = {
  [date: string]: {
    periods: { startingDay: boolean; endingDay: boolean; color: string }[];
  };
};

const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

const CalendarSinglePlant = ({ plant }: AllPlantProps): JSX.Element => {
  const {
    maxDaysUntilHarvest,
    minDaysUntilHarvest,
    sowingStartDate,
    sowingWindowDays,
    name,
  } = plant;

  const [edge, setEdge] = useState<String>("");
  const minDate: string = `${currentYear}-${currentMonth}-01`;
  const maxDate: string = `${currentYear + 1}-${currentMonth}-01`;
  const harvestWindowDays =
    maxDaysUntilHarvest - minDaysUntilHarvest + sowingWindowDays;

  let harvestFromDate = new Date(`${currentYear}${sowingStartDate}`);
  harvestFromDate.setDate(harvestFromDate.getDate() + minDaysUntilHarvest);
  const startDateHarvesting = `-${String(
    harvestFromDate.getMonth() + 1
  ).padStart(2, "0")}-${String(harvestFromDate.getDate()).padStart(2, "0")}`;

  const testDates: { event: string; fromDate: string; numberOfDays: number }[] =
    [
      {
        event: `sowing-window`,
        fromDate: `${currentYear + 1}${sowingStartDate}`,
        numberOfDays: sowingWindowDays,
      },
      {
        event: `sowing-window`,
        fromDate: `${currentYear}${sowingStartDate}`,
        numberOfDays: sowingWindowDays,
      },
      {
        event: "harvest-window",
        fromDate: `${harvestFromDate.getFullYear() + 1}${startDateHarvesting}`,
        numberOfDays: harvestWindowDays,
      },
      {
        event: "harvest-window",
        fromDate: `${harvestFromDate.getFullYear()}${startDateHarvesting}`,
        numberOfDays: harvestWindowDays,
      },
    ];

  const getMarked = () => {
    let marked: Marked = {};
    let color = "";
    testDates.forEach(({ event, fromDate, numberOfDays }) => {
      if (event === "sowing-window") {
        color = "orange";
      } else if (event === "harvest-window") {
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

  type CalenderDateType = {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
  };

  const handleChangedMonth = (calenderDate: CalenderDateType) => {
    if (calenderDate.dateString <= minDate) {
      setEdge("min");
    } else if (calenderDate.dateString >= maxDate) {
      setEdge("max");
    } else {
      setEdge("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.key}>
        <Text>Sowing</Text>
        <View style={styles.sowing}></View>
      </View>
      <View style={styles.key}>
        <Text>Harvesting</Text>
        <View style={styles.harvesting}></View>
      </View>
      <Calendar
        onMonthChange={handleChangedMonth}
        initialDate={`${currentYear}-${currentMonth}-01`}
        markingType="multi-period"
        markedDates={getMarked()}
        minDate={minDate}
        maxDate={maxDate}
        disableArrowLeft={edge === "min" ? true : false}
        disableArrowRight={edge === "max" ? true : false}
        style={{
          borderWidth: 1,
          borderColor: "grey",
          // height: 350,
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
  sowing: {
    marginLeft: 10,
    width: 30,
    borderTopWidth: 4,
    borderTopColor: "orange",
  },
  harvesting: {
    marginLeft: 10,
    width: 30,
    borderTopWidth: 4,
    borderTopColor: "green",
  },
  key: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default CalendarSinglePlant;
