import { View, Text } from "react-native"
import { homeStyles } from "../HomeScreen/Home.component.style"
import { useEffect } from "react"

export default function EditProfileScreen({currentUser}: any): JSX.Element {

    useEffect( () => {  
        console.log(currentUser)      
    }, [])
    return (
        <View style={homeStyles.container}>
      <Text style={homeStyles.homeHeader}>Profile</Text>
      
      </View>
    )
}