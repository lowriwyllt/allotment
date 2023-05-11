import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addPlantToAllotment,
  getPlantByName,
  deletePlantFromAllotment,
  getPlantsFromAllotment,
} from "../../firebase/database";
import { AllotmentPlant, PlantType } from "../../types/Plants.types";
import CalendarSinglePlant from "./components/Calendar";
import theme from "../../styles/theme.style";
import DateModal from "./components/DateModal";
import { UserType } from "../../types/Users.types";
import { useIsFocused } from "@react-navigation/native";

//--------------------------------need to change any----------------------------------------
const SinglePlantScreen = ({ route, currentUser }: any) => {
  const [plant, setPlant] = useState<PlantType | undefined>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<any>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [plantKeys, setPlantKeys] = useState<any>([]);
  const [sowingInstructions, setSowingInstructions] = useState<any>([]);
  const [allotmentPlants, setAllotmentPlants] = useState<AllotmentPlant[]>([]);
  const [existsInAllotment, setExistsInAllotment] = useState<boolean>(false);
  const { plantName } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    getPlantByName(plantName)
      .then((response) => {
        //response type needs to be changed
        setPlant(response);
        if (response) {
          const plantKeys = response.sowingInstructions.map((instruction) => {
            return instruction.slice(0, 2);
          });
          const sowingInstructions = response.sowingInstructions.map(
            (instruction) => {
              return instruction;
            }
          );
          setPlantKeys(plantKeys);
          setSowingInstructions(sowingInstructions);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        const { message, code } = error;
        setIsLoading(false);
        setError({ message, code });
      });
  }, [plantName, isFocused]);

  useEffect(() => {
    getPlantsFromAllotment(currentUser.id).then((response) => {
      if (response && plant) {
        setAllotmentPlants(response);
        response.filter((userPlant) => userPlant.id === plant.name);
        if (response.length > 0) {
          setExistsInAllotment(true);
        } else {
          setExistsInAllotment(false);
        }

        // response.forEach((userPlant) => {
        //   if (userPlant.id === plant.name) {
        //     setExistsInAllotment(true);
        //   } else {
        //     setExistsInAllotment(false);
        //   }
        // });
      }
    });
  }, [plantName, existsInAllotment, isFocused]);

  const handleOnPressDelete = () => {
    deletePlantFromAllotment(currentUser.id, plant);
    setExistsInAllotment(false);
  };

  const addPlant = () => {
    addPlantToAllotment(currentUser.id, plant, "TBC"); // needs to change "Ryan to a user Id"
    setModalVisible(true);
    setExistsInAllotment(true);
  };
  // console.log(error);

  // console.log("SinglePlantScreen");
  return (
    <ScrollView>
      <View style={SinglePlantStyles.container}>
        <DateModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          plantName={plantName}
          plant={plant}
          currentUser={currentUser}
        />
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
            {existsInAllotment ? (
              <Pressable
                style={SinglePlantStyles.button}
                onPress={handleOnPressDelete}
              >
                <Text style={SinglePlantStyles.buttonText}>-</Text>
              </Pressable>
            ) : (
              <Pressable style={SinglePlantStyles.button} onPress={addPlant}>
                <Text style={SinglePlantStyles.buttonText}>+</Text>
              </Pressable>
            )}
            <Text>
              Minimum Temperature in Celcius: {plant.minTempCelcius}
              {"\u00B0"}C{/*  "\u00B0" is the symbol for degrees */}
            </Text>
            <Text>Sunlight needed: {plant.sunLight}</Text>
            <Text>Watering needed: {plant.wateringFrequencyInDays}</Text>
            <CalendarSinglePlant plant={plant} />
            {plant.sowingInstructions.map((instruction) => {
              <Text>{instruction}</Text>;
            })}
            <View>
              {sowingInstructions.map((instruction: string, index: number) => {
                return (
                  <View key={plantKeys[index]}>
                    <Text>{instruction}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <View>{error && <Text>Something went wrong...</Text>}</View>
        )}
      </View>
    </ScrollView>
  );
};

export default SinglePlantScreen;

export const SinglePlantStyles = StyleSheet.create({
  header: {
    fontSize: theme.mainheader,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.lightcream,
    // padding: 50,
  },
  button: {
    backgroundColor: theme.green, // chose green as original was feature which doesnt exist
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
