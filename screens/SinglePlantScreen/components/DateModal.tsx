import {
  Alert,
  Modal,
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SinglePlantStyles } from "../SinglePlantScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDate } from "../../utils/utils";

const DateModal = ({
  modalVisible,
  setModalVisible,
  plantName,
}: {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  plantName: string;
}) => {
  const defaultDate = new Date();
  const [date, setDate] = useState<string>(formatDate(defaultDate));

  const handleOnChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(formatDate(selectedDate));
    }
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
          <DateTimePicker
            value={new Date(date)}
            mode="date"
            display="spinner"
            onChange={handleOnChange}
          />
          <TouchableOpacity>
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
