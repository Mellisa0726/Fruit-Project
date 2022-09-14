import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

interface NotificationProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Notification(props: NotificationProps) {
  const closeNotification = () => {
      props.setModalVisible(!props.isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={props.isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>
          <Button title="Close" onPress={closeNotification} />
        </View>
      </Modal>
    </View>
  );
};