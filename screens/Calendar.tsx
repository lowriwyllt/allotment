import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

type Marked = {
  [date: string]: {
    periods: { startingDay: boolean; endingDay: boolean; color: string }[];
  };
};

const CalendarSinglePlant = (): JSX.Element => {
  const getMarked = () => {
    let marked: Marked = {};
    for (let i = 1; i <= 10; i++) {
      let day = i.toString().padStart(2, "0");
      let periods = [
        {
          startingDay: i === 1,
          endingDay: i === 10,
          color: "teal",
        },
        ...(i >= 2 && i <= 6
          ? [
              {
                startingDay: i === 2,
                endingDay: i === 6,
                color: "orange",
              },
            ]
          : []),
      ];
      marked[`2022-12-${day}`] = {
        periods,
      };
    }
    return marked;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        initialDate="2022-12-01"
        markingType="multi-period"
        markedDates={getMarked()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  export default CalendarSinglePlant;