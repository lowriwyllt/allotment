import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { homeStyles } from "./Home.component.style";

export default function HomeScreen({ currentUserEmail }: any): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <View style={homeStyles.container}>

      <Image
        source={require("../../crops/farm.png")}
        style={homeStyles.background}
      />
      <View style={homeStyles.allotmentButtonContainer}>

      <Image
        source={require("../../crops/carrot/3.png")}
        style={homeStyles.carrot}
      />
      <Image
        source={require("../../crops/beetroot/5.png")}
        style={homeStyles.beetroot}
      />
      <Image
        source={require("../../crops/beans/5.png")}
        style={homeStyles.beans}
      />
      </View>
      <Text style={homeStyles.header}>Welcome, Peter!</Text>
      <View style={homeStyles.bodyContainer}>
        <Text style={homeStyles.subheading}>tasks:</Text>
      </View>
      {/* <Image style={homeStyles.image} source={require('../../crops/farm.png')}></Image> */}
      {/* <Text style={homeStyles.homeHeader}>allotment</Text>
      <Text>Email: {currentUserEmail}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
        <Text>Plants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Text>Edit Profile</Text> */}
      {/* </TouchableOpacity> */}
    </View>
  );
}
