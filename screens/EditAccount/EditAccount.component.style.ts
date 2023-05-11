import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";
const EditProfileStyles = StyleSheet.create({
  modalView: {
    width: "90%",
    margin: 20,
    marginTop: "25%",
    backgroundColor: theme.lightcream,
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
  button: {
    position: "absolute",
    top: -5,
    right: -5,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 40,
    height: 40,
    backgroundColor: theme.green,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    paddingBottom: 20,
    justifyContent: "center",
  },
  centeredView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  avatars: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "cover",
    borderColor: theme.brown,
    borderWidth: 1,
  },
  avatarsActive: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "cover",
    borderColor: theme.orange,
    borderWidth: 4,
  },
  textButton: {
    fontWeight: "bold",
  },
  profileDetail: {
    marginLeft: 20,
    width: "100%",
  },
  details: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: theme.brown,
    borderBottomWidth: 1,
    borderTopColor: theme.brown,
    borderTopWidth: 1,
    alignItems: "center",
    padding: 7,
  },

  containerAll: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  margin10: {
    margin: 10,
  },
  spacedMargin: {
    marginTop: 10,
    marginBottom: 60,
  },
});

export default EditProfileStyles;
