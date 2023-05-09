import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../types/Users.types";
import { AccountStyles } from "./Account.component.style";
import theme from "../../styles/theme.style";

export default function Account({
  currentUser,
}: {
  currentUser: UserType | undefined;
}): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={{ backgroundColor: theme.lightcream }}>
      <View style={AccountStyles.container}>
        <Image
          style={AccountStyles.avatars}
          key={currentUser?.avatarUrl}
          source={{ uri: currentUser?.avatarUrl }}
        />
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>

        <TouchableOpacity
          style={AccountStyles.editAccount}
          onPress={() => navigation.navigate("editAccount")}
        >
          <Text style={AccountStyles.textButton}>Edit account details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AccountStyles.button}>
          <Text style={AccountStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
