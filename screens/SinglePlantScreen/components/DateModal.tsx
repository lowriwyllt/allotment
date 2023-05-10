import {
  Alert,
  Modal,
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDate } from "../../utils/utils";
import { addPlantToAllotment } from "../../../firebase/database";
import { PlantType } from "../../../types/Plants.types";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../styles/theme.style";
import { SinglePlantStyles } from "../../../styles/singlePlantsScreen.style";

const DateModal = ({
  modalVisible,
  setModalVisible,
  plantName,
  plant,
  currentUser,
}: {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  plantName: string;
  plant: PlantType | undefined;
  currentUser: any;
}) => {
  const defaultDate = new Date();
  const [date, setDate] = useState<string>(formatDate(defaultDate));
  const [showDate, setShowDate] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const handleOnChange = (event: any, selectedDate?: Date) => {
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
    // needs to change "Ryan to a user Id"
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
            Enter the date you planted the {plantName.toLowerCase()}
          </Text>
          <Text>{date.toLocaleString()}</Text>
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
          <TouchableOpacity onPress={addToAllotment}>
            <Text style={{ fontWeight: "bold" }}>Add to my allotment</Text>
          </TouchableOpacity>
          <Pressable
            style={SinglePlantStyles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={SinglePlantStyles.textStyle}>x</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DateModal;
