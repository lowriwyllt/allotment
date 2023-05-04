import { Text, TouchableOpacity } from "react-native";
import { homeStyles } from "./HomeScreen/Home.component.style";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";



const SignOutButton = (): JSX.Element => {

    const navigation = useNavigation<any>();

    const handleSignOut = () => {

        auth
          .signOut()
          .then(() => {
            navigation.replace("login");
          })
          .catch((err) => alert(err.message));

      };

    return (

     <TouchableOpacity onPress={handleSignOut} style={homeStyles.button}>
        <Text style={homeStyles.buttonText}>Sign Out</Text>
     </TouchableOpacity>

    );

};


export default SignOutButton;
