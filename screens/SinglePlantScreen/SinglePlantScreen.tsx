import { Image, Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getPlantByName,
  deletePlantFromAllotment,
  getPlantsFromAllotment,
} from "../../firebase/database";
import { AllotmentPlant, PlantType } from "../../types/Plants.types";
import CalendarSinglePlant from "./components/Calendar";
import DateModal from "./components/DateModal";
import {
  ParamListBase,
  RouteProp,
  useIsFocused,
} from "@react-navigation/native";
import { SinglePlantStyles } from "./SinglePlantScreen.style";
import { UserType } from "../../types/Users.types";

type SinglePlantScreenParams = { plantName?: string };

// type SinglePlantScreenParams = {
//   route: RouteProp<ParamListBase, "plant">;
//   currentUser: UserType;
// };

type PlantScreenRouteProp = RouteProp<ParamListBase, "plant">;

interface SinglePlantScreenProps {
  currentUser: UserType;
  route: PlantScreenRouteProp & {
    params?: SinglePlantScreenParams;
  };
  navigation: any;
}

const SinglePlantScreen = ({ route, currentUser }: SinglePlantScreenProps) => {
  const [plant, setPlant] = useState<PlantType | undefined>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<
    boolean | { message: string; code: string }
  >(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sowingInstructions, setSowingInstructions] = useState<string[]>([]);
  const [allotmentPlants, setAllotmentPlants] = useState<AllotmentPlant[]>([]);
  const [existsInAllotment, setExistsInAllotment] = useState<boolean>(false);
  const { plantName = "" } = route.params || {};
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    getPlantByName(plantName as string)
      .then((response) => {
        setPlant(response);
        if (response) {
          const sowingInstructions = response.sowingInstructions.map(
            (instruction) => {
              return instruction;
            }
          );
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
      }
    });
  }, [isFocused, plantName]);

  const handleOnPressDelete = () => {
    deletePlantFromAllotment(currentUser.id, plant);
    setExistsInAllotment(false);
  };

  const addPlant = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={SinglePlantStyles.page}>
      <View style={SinglePlantStyles.container}>
        <DateModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          plantName={plantName as string}
          plant={plant}
          currentUser={currentUser}
          setExistsInAllotment={setExistsInAllotment}
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
                {"\u00B0"}C
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
