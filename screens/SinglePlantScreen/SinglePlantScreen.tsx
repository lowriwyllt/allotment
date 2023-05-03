import {
  Alert,
  Modal,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getPlantByName } from "../../firebase/database";
import { PlantType } from "../../types/Plants.types";
import CalendarSinglePlant from "./components/Calendar";
import theme from "../../styles/theme.style";
import DateModal from "./components/DateModal";

//--------------------------------need to change any----------------------------------------
const SinglePlantScreen = ({ route }: any) => {
  const [plant, setPlant] = useState<PlantType | undefined>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<any>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
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
  }, []);

  const addPlant = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView>
      <View style={SinglePlantStyles.container}>
        <DateModal modalVisible={modalVisible} setModalVisible={setModalVisible} plantName={plantName} />
        <Text style={SinglePlantStyles.header}>{plantName}</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : plant && !error ? (
          <>
            <Text>{plant.scientificName}</Text>
            <Image
              style={SinglePlantStyles.plantImage}
              source={{ uri: plant.img }}
            ></Image>
            <Pressable style={SinglePlantStyles.button} onPress={addPlant}>
              <Text style={SinglePlantStyles.buttonText}>+</Text>
            </Pressable>
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

export const SinglePlantStyles = StyleSheet.create({
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
  button: {
    backgroundColor: theme.feature,
    width: 40,
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
});
