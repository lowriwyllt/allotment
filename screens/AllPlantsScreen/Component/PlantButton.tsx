import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PlantProps } from "../../../types/Plants.types";
import theme from "../../../styles/theme.style";

const PlantButton = ({ plant }: PlantProps) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("plant", { plantName: plant.name });
  };

  return (
    <Pressable style={styles.button} onPress={handlePress} key={plant.name}>
      <Image style={styles.plantImages} source={{ uri: plant.img }}></Image>
      <Text style={styles.name}>{plant.name}</Text>
    </Pressable>
  );
};

export default PlantButton;

const styles = StyleSheet.create({
  plantImages: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "cover",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.brown,
  },
  button: {
    margin: 10,
  },
  name: {
    textAlign: "center",
  },
});
