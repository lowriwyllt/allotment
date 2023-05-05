import { Text, View } from "react-native"
import { getTasks } from "../../firebase/database"

export default function TasksList({currentUser}: any): JSX.Element { 
    getTasks(currentUser)
    return (

        <View>
            
        </View>
    )
}
