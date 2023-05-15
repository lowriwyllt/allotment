import { StyleSheet, Text, View, ScrollView } from "react-native";
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
    <ScrollView style={{ backgroundColor: theme.cream }}>
      <View style={styles.container}>
        <Text style={styles.subheading}>Tap a plant to see more details</Text>
        <View style={styles.buttons}>
          {plants?.map((plant) => {
            return <PlantButton key={plant.name} plant={plant} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default AllPlantsScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  subheading: {
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    width: "100%",
    color: theme.lightcream,
    fontSize: 17,
    fontWeight: "600",
    backgroundColor: theme.orange,
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.cream,
    marginBottom: 40,
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
