import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ChangeEvent, useState } from "react";
import { formatDate } from "../../utils/utils";
import { addPlantToAllotment } from "../../../firebase/database";
import { PlantType } from "../../../types/Plants.types";
import { useNavigation } from "@react-navigation/native";
import { SinglePlantStyles } from "../SinglePlantScreen.style";
import { UserType } from "../../../types/Users.types";
import { DrawerNavigationType } from "../../../types/Navigation.types";

const DateModal = ({
  modalVisible,
  setModalVisible,
  plantName,
  plant,
  currentUser,
  setExistsInAllotment,
}: {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  plantName: string;
  plant: PlantType | undefined;
  currentUser: UserType;
  setExistsInAllotment: (bool: boolean) => void;
}) => {
  const defaultDate = new Date();
  const [date, setDate] = useState<string>(formatDate(defaultDate));
  const [showDate, setShowDate] = useState<boolean>(false);
  const navigation = useNavigation<DrawerNavigationType>();

  const handleOnChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(formatDate(selectedDate));
      setShowDate(false);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Added to your allotment",
      `${plantName} added to your allotment`,
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
          },
          style: "cancel",
        },
        {
          text: "Go to allotment",
          onPress: () => navigation.navigate("My Allotment"),
        },
      ]
    );

  const addToAllotment = () => {
    addPlantToAllotment(currentUser.id, plant, date);
    setModalVisible(!modalVisible);
    createTwoButtonAlert();
    setExistsInAllotment(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={SinglePlantStyles.centeredView}>
        <View style={SinglePlantStyles.modalView}>
          <Text style={SinglePlantStyles.modalText}>
            What day did you sow {plantName} to your allotment? 🌱
          </Text>
          <Text>Date planted: {date.toLocaleString()}</Text>
          {showDate ? (
            <DateTimePicker
              value={new Date(date)}
              mode="date"
              display="spinner"
              textColor="#000000"
              onChange={handleOnChange}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setShowDate(true);
              }}
            >
              <Text>Change Date</Text>
            </TouchableOpacity>
          )}
          <View style={{ display: "flex", width: "100%" }}>
            <TouchableOpacity
              style={SinglePlantStyles.cancel}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={SinglePlantStyles.textStyle}>dismiss</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={SinglePlantStyles.confirm}
              onPress={addToAllotment}
            >
              <Text style={SinglePlantStyles.textStyle}>
                Add to my allotment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateModal;
