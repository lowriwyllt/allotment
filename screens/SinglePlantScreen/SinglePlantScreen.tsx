import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPlantByName } from "../../firebase/database";
import { PlantType } from "../../types/Plants.types";

//--------------------------------need to change any----------------------------------------
const SinglePlantScreen = ({ route }: any) => {
  const [plant, setPlant] = useState<PlantType | undefined>();
  const { plantName } = route.params;

  useEffect(() => {
    getPlantByName(plantName).then((response) => {
      //response type needs to be changed
      setPlant(response);
    });
  }, []);

  return (
    <View style={styles.container}>
      {plant ? (
        <>
          <Text style={styles.header}>{plant.name}</Text>
          <Text>{plant.scientificName}</Text>
          <Image style={styles.plantImage} source={{ uri: plant.img }}></Image>
          <Text>
            Minimum Temperature in Celcius: {plant.minTempCelcius}
            {"\u00B0"}C{/*  "\u00B0" is the symbol for degrees */}
          </Text>
          <Text>Sunlight needed: {plant.sunLight}</Text>
          <Text>Watering needed: {plant.watering}</Text>
          <Text>{plant.sowingInstructions}</Text>
        </>
      ) : null}
    </View>
  );
};

export default SinglePlantScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: "center",
  },
  plantImage: {
    width: 300,
    height: 300,
    borderRadius: 50,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    // padding: 50,
  },
});
