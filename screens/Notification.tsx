import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import { api } from '../api'

interface NotificationProps {
  isModalVisible: boolean;
  changeModalState: () => void;
}

export default function Notification(props: NotificationProps) {
  const [data, setData] = React.useState<object>({});

  useEffect(() => {
    api.getNotification()
    .then(res => {
        setData(res)
        //console.warn(res)
    })
    /* .then(() =>
      //console.warn('data', data?.rotten)

    ) */
    .catch(err => console.log(err))
  });

  const closeNotification = () => {
      props.changeModalState();
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