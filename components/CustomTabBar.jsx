import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

// Separate ModalItem component to avoid redundancy
const ModalItem = ({ iconUri, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.modalItem}>
    <Image source={{ uri: iconUri }} style={styles.modalIcon} />
    <Text style={styles.modalText}>{text}</Text>
  </TouchableOpacity>
);

export default function CustomTabBar(props) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToSettings = () => {
    setModalVisible(false); // Close the modal
    navigation.navigate('Settings');
  };

  const confirmLogOut = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false); // Close the modal
            // Handle log out logic here
            console.log("Logged out");
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <BottomTabBar {...props} />
      <TouchableOpacity
        style={styles.profileAvatar}
        onPress={toggleModal}
      >
        <Image
          source={require('../img/profile/avatar.png')} // Replace with your avatar URL
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Close modal when tapping outside
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <ModalItem
            iconUri="https://cdn-icons-png.flaticon.com/512/64/64572.png"
            text="แก้ไขโปรไฟล์"
            onPress={navigateToSettings}
          />
          <ModalItem
            iconUri="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
            text="ออกจากระบบ"
            onPress={confirmLogOut}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding: 10,
  },
  profileAvatar: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#ffff',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  modalIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
  },
});
