import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAllPlantImages } from "../../firebase/database";
import { useEffect, useState } from "react";
import PlantButton from "./Component/PlantButton";
import { PlantTypeForAll } from "../../types/Plants.types";

const AllPlantsScreen = () => {
  const [plants, setPlants] = useState<PlantTypeForAll[] | undefined>([]);

  useEffect(() => {
    getAllPlantImages().then((response) => {
      setPlants(response);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plants</Text>
      <View style={styles.buttons}>
        {plants?.map((plant) => {
          return <PlantButton key={plant.name} plant={plant} />;
        })}
      </View>
    </View>
  );
};

export default AllPlantsScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    flex: 0.5,
    flexWrap: "wrap",
  },
});


