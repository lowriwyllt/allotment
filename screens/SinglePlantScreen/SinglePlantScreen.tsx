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
import { SinglePlantStyles } from "./SinglePlantScreen.style";

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
        const { message, code } = error;
        setIsLoading(false);
        setError({ message, code });
      });
  }, [plantName, isFocused]);

  useEffect(() => {
    getPlantsFromAllotment(currentUser.id).then((response) => {
      if (response && plantName) {
        setAllotmentPlants(response);
        const currentPlantInAllotment = response.filter(
          (userPlant) => userPlant.id === plantName
        );
        if (currentPlantInAllotment.length > 0) {
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
  }, [isFocused, plantName]);

  const handleOnPressDelete = () => {
    deletePlantFromAllotment(currentUser.id, plant);
    setExistsInAllotment(false);
  };

  const addPlant = () => {
    addPlantToAllotment(currentUser.id, plant, "TBC"); // needs to change "Ryan to a user Id"
    setModalVisible(true);
    setExistsInAllotment(true);
  };

  return (
    <ScrollView style={SinglePlantStyles.page}>
      <View style={SinglePlantStyles.container}>
        <DateModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          plantName={plantName}
          plant={plant}
          currentUser={currentUser}
        />
        {isLoading ? (
          <Text style={SinglePlantStyles.loading}>Loading...</Text>
        ) : plant && !error ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <View style={SinglePlantStyles.imgContainer}>
                <Image
                  style={SinglePlantStyles.plantImage}
                  source={{ uri: plant.img }}
                ></Image>
              </View>
              <View style={SinglePlantStyles.titleContainer}>
                <Text style={SinglePlantStyles.header}>{plantName}</Text>
                <Text>{plant.scientificName}</Text>
              </View>
            </View>
            <CalendarSinglePlant plant={plant} />
            {existsInAllotment ? (
              <Pressable
                style={SinglePlantStyles.deleteButton}
                onPress={handleOnPressDelete}
              >
                <Text style={SinglePlantStyles.buttonText}>
                  remove from my allotment
                </Text>
              </Pressable>
            ) : (
              <Pressable style={SinglePlantStyles.addButton} onPress={addPlant}>
                <Text style={SinglePlantStyles.buttonText}>
                  add to my allotment
                </Text>
              </Pressable>
            )}
            <View style={SinglePlantStyles.infoContainer}>
              <Text style={SinglePlantStyles.temp}>
                Preferred temperature: {plant.minTempCelcius}
                {"\u00B0"}C{/*  "\u00B0" is the symbol for degrees */}
              </Text>
              <Text style={SinglePlantStyles.sun}>
                Preferred weather: {plant.sunLight} sunlight
              </Text>
              <Text style={SinglePlantStyles.water}>
                Watering schedule: every {plant.wateringFrequencyInDays} days
              </Text>
            </View>
            {plant.sowingInstructions.map((instruction) => {
              <Text>{instruction}</Text>;
            })}
            <View>
              <Text style={SinglePlantStyles.subheader}>
                Sowing Instructions
              </Text>
              {sowingInstructions.map((instruction: string, index: number) => {
                return (
                  <View key={instruction}>
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
