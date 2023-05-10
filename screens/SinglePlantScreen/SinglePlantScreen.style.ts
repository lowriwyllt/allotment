import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

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
      backgroundColor: theme.cream,
      minHeight: "100%"
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
  