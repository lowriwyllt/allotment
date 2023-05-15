import { Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PlantProps } from "../../types/Plants.types";
import { homeStyles } from "./Home.component.style";
import { DrawerNavigationType } from "../../types/Navigation.types";

const AllotmentPlantButton = ({ plant }: PlantProps) => {
  const navigation = useNavigation<DrawerNavigationType>();
  const handlePress = () => {
    navigation.navigate("plant", { plantName: plant.name });
  };

  return (
    <Pressable
      style={homeStyles.touchableOpacity}
      onPress={handlePress}
      key={plant.name}
    >
      <Image style={homeStyles.crop} source={{ uri: plant.img }}></Image>
    </Pressable>
  );
};

export default AllotmentPlantButton;
