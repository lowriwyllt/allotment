import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PlantProps } from "../../types/Plants.types";
import theme from "../../styles/theme.style";
import { homeStyles } from "./Home.component.style";



const AllotmentPlantButton = ({ plant }: PlantProps) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("plant", { plantName: plant.name });
  };

  return (
    <Pressable style={homeStyles.touchableOpacity} onPress={handlePress} key={plant.name}>
      <Image style={homeStyles.crop} source={{ uri: plant.img }}></Image>
     
    </Pressable>
  );
};

export default AllotmentPlantButton;