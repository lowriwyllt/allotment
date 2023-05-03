import { Alert, Modal, Pressable, Text, View } from "react-native";
import { SinglePlantStyles } from "../SinglePlantScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { getCurrentDate } from "../../utils/utils";

const DateModal = ({
  modalVisible,
  setModalVisible,
  plantName,
}: {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  plantName: string;
}) => {
  const [date, setDate] = useState(getCurrentDate());

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
          <Text>selected: {date}</Text>
          {/* <DateTimePicker /> */}
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
