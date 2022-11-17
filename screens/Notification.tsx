import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import Modal from "react-native-modal";
import { api } from '../api'

interface NotificationProps {
  isModalVisible: boolean;
  changeModalState: () => void;
}

export default function Notification(props: NotificationProps) {
  const [rotten, setRotten] = useState<any>([]);
  const [rotten1, setRotten1] = useState<any>([]);
  const [rotten2, setRotten2] = useState<any>([]);

  useEffect(() => {
    api.getNotification()
    .then(res => {
        setRotten(res.rotten);
        setRotten1(res.rotten_before_1);
        setRotten2(res.rotten_before_2);
        // window.alert(JSON.stringify(res))
        //console.warn(res)
    })
    /* .then(() =>
      //console.warn('data', data?.rotten)

    ) */
    .catch(err => console.log(err))
  }, []);

  const closeNotification = () => {
      props.changeModalState();
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={props.isModalVisible}
        backdropOpacity={0}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        customBackdrop={
          <TouchableWithoutFeedback onPress={closeNotification}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        }
      >
        <View style={styles.container}>
          <ScrollView style={{ width: '100%' }}>
            {rotten.length === 0 && rotten1.length === 0 && rotten2.length === 0 &&
              <Text>沒有通知</Text>}
            {rotten.length !== 0 && rotten.map((item: any) => 
              <>
                <Text>已壞掉</Text>
                <View style={styles.row}>
                  <Image style={styles.img} source={{uri: item.route}}></Image>
                  <Text>{item.name}</Text>
                </View>
              </>
            )}
            {rotten1.length !== 0 && rotten.map((item: any) => 
              <>
                <Text>一天後壞掉</Text>
                <View style={styles.row}>
                  <Image style={styles.img} source={{uri: item.route}}></Image>
                  <Text>{item.name}</Text>
                </View>
              </>
            )}
            {rotten2.length !== 0 && rotten.map((item: any) => 
              <>
                <Text>兩天後壞掉</Text>
                <View style={styles.row}>
                  <Image style={styles.img} source={{uri: item.route}}></Image>
                  <Text>{item.name}</Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    maxHeight: 600,
    padding: 10,
    position: 'absolute',
    top: 180,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.4,
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 45,
    marginRight: 7,
    backgroundColor: '#000'
  },
  row: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});