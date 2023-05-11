import { StyleSheet } from "react-native";
import theme from "../../styles/theme.style";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.brown,
  },
  registerContainer: {
    flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.cream,
    height: "100%",
  },
  background: {
    width: "100%",
    height: 400,
    // resizeMode: "contain",
    zIndex: -99999,
    // top: 0,
    position: "absolute",
  },
  header: {
    // fontWeight: "bold",
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 20,
    color: "#fff",
  },
  subheading: {
    width: "70%",
    paddingTop: 20,
    paddingBottom: 100,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.brown,
  },
  allotmentimg: {
    width: "80%",
    resizeMode: "contain",
    // marginTop: 50
  },
  inputContainer: {
    width: "80%",
    marginTop: 190,
  },
  input: {
    backgroundColor: theme.lightcream,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: theme.orange,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: theme.lightcream,
    marginTop: 5,
    borderColor: theme.orange,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: theme.orange,
    fontWeight: "700",
    fontSize: 16,
  },
  avatarsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 20,
    marginBottom: -140,
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
});

export default LoginStyle;
