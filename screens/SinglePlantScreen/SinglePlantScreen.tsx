import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addPlantToAllotment,
  getPlantByName,
  deletePlantFromAllotment,
} from "../../firebase/database";
import { PlantType } from "../../types/Plants.types";
import CalendarSinglePlant from "../Calendar";

//--------------------------------need to change any----------------------------------------
const SinglePlantScreen = ({ route }: any) => {
  const [plant, setPlant] = useState<PlantType | undefined>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<any>(false);
  const { plantName } = route.params;

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPlantByName(plantName)
      .then((response) => {
        //response type needs to be changed
        setPlant(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        const { message, code } = error;
        setIsLoading(false);
        setError({ message, code });
      });
  }, [plantName]);

  const handleOnPress = () => {
    addPlantToAllotment("Rh2gty20wdtiEItYtcz2", plant);
  };

  const handleOnPressDelete = () => {
    deletePlantFromAllotment("Rh2gty20wdtiEItYtcz2", plant);
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={handleOnPressDelete}>
        <Text>Delete this from your allotment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Test add to allotment</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.header}>{plantName}</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : plant && !error ? (
          <>
            <Text>{plant.scientificName}</Text>
            <Image
              style={styles.plantImage}
              source={{ uri: plant.img }}
            ></Image>
            <Text>
              Minimum Temperature in Celcius: {plant.minTempCelcius}
              {"\u00B0"}C{/*  "\u00B0" is the symbol for degrees */}
            </Text>
            <Text>Sunlight needed: {plant.sunLight}</Text>
            <Text>Watering needed: {plant.watering}</Text>
            <CalendarSinglePlant plant={plant} />

            <Text>{plant.sowingInstructions.split(".").join("\n\n")}</Text>
          </>
        ) : (
          <>
            <Text>{error.code}</Text>
            <Text>{error.message}</Text>
          </>
        )}
      </View>
    </ScrollView>
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
