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
      <View>
        <Image style={styles.plantImages} source={{ uri: plant.img }}></Image>
      </View>
      <Text style={styles.name}>{plant.name}</Text>
    </Pressable>
  );
};

export default PlantButton;

const styles = StyleSheet.create({
  plantImages: {
    width: 42.5,
    height: 42.5,
    margin: 22.5,
    
    resizeMode: "contain",
    // borderStyle: "solid",
  },
  button: {
    backgroundColor: theme.lightcream,
    margin: 15,
    borderWidth: 1,
    borderColor: theme.brown,
    borderRadius: 50,

    width: 85,
    height: 85,
  },
  name: {
    textAlign: "center",
  },
});
