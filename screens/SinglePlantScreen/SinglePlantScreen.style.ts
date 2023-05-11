import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

export const SinglePlantStyles = StyleSheet.create({
  header: {
    fontSize: theme.mainheader,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
  imgContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.green,
    justifyContent: "center",
    alignItems: "center",
  },
  plantImage: {
    width: 40,
    height: 50,
    // borderRadius: 50,
    resizeMode: "contain",
  },
  page: {
    backgroundColor: theme.cream,
  },
  container: {
    flex: 1,
    alignItems: "center",
    minHeight: "100%",
    width: "95%",
    alignSelf: "center",
    // padding: 50,
  },
  addButton: {
    backgroundColor: theme.green, // chose green as original was feature which doesnt exist
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.green,
    padding: 10,
    textAlign: "center",
  },
  body: {
    color: theme.brown,
    padding: 10,
    fontWeight: "600"
  },
  deleteButton: {
    backgroundColor: theme.orange, // chose green as original was feature which doesnt exist
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  cancel: {
    backgroundColor: "lightgrey", // chose green as original was feature which doesnt exist
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  confirm: {
    backgroundColor: theme.orange, // chose green as original was feature which doesnt exist
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //   marginTop: 22,
    marginBottom: 20,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
    fontSize: 20,
    fontWeight: "600",
    color: theme.green,
    maxWidth: "80%",
  },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  loading: {
    alignSelf: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    paddingTop:10,
    paddingBottom:10,
  },
  temp: {
    borderWidth:1,
    width: "32%",
    borderRadius: 10,
    borderColor: theme.green,
    padding: 4,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: theme.green,
},
sun: {
    borderWidth: 1,
    width: "32%",
    borderRadius: 10,
    borderColor: theme.green,
    padding: 4,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: theme.green
},
water: {
    borderWidth: 1,
    width: "32%",
    borderRadius: 10,
    borderColor: theme.green,
    padding: 4,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: theme.green
}
});
