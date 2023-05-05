import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserType from "../../types/Users.types";
import { AccountStyles } from "./Account.component.style";

export default function Account({
  currentUser,
}: {
  currentUser: UserType | undefined;
}): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <ScrollView>
      <View style={AccountStyles.container}>
        <Image
          style={AccountStyles.avatars}
          key={currentUser?.avatarUrl}
          source={{ uri: currentUser?.avatarUrl }}
        />
        <Text style={AccountStyles.bold}>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>

        <TouchableOpacity
          style={AccountStyles.editAccount}
          onPress={() => navigation.navigate("editAccount")}
        >
          <Text>Edit account details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
