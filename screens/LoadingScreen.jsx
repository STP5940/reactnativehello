// LoadingScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main'); // เปลี่ยนจาก 'Home' เป็น 'Main'
    }, 3000); // 3000 = 3 วินาทีสำหรับหน้าโหลด

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={require('../img/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.text}>Enterprise Computer Systems (Thailand) Co., Ltd.</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#131414',
    backgroundColor: 'rgb(0, 0, 0)', // สีพื้นหลังสีดำ
  },
  logoContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    width: 380,
    height: 150,
  },
  textContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0, // เพิ่ม marginBottom ให้ข้อความ EcsThai
  },
});
