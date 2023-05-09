import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAllPlantImages } from "../../firebase/database";
import { useEffect, useState } from "react";
import PlantButton from "./Component/PlantButton";
import { PlantTypeForAll } from "../../types/Plants.types";
import theme from "../../styles/theme.style";

const AllPlantsScreen = () => {
  const [plants, setPlants] = useState<PlantTypeForAll[] | undefined>([]);

  useEffect(() => {
    getAllPlantImages().then((response) => {
      setPlants(response);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>Tap a plant to see more details</Text>
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
  subheading: {
    paddingTop: 40,
    color: theme.darkgreen,
    fontSize: 17,
    fontWeight: "600",
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.cream,
  },
  buttons: {
    paddingTop: 20,
    justifyContent: "center",
    width: "95%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
