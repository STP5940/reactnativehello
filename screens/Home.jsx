import { StyleSheet, Button, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({iconName}) => {
  return (
    <ScrollView style={{ padding: 10 }}>
        <View style={{ alignItems: 'center'}}>
            <Text style={styles.highlight}>รายชื่อสถานที่ท่องเที่ยว</Text>
        </View>
        <View style={styles.viewlist}>
            <Image source={{ uri: 'https://www.melivecode.com/attractions/1.jpg' }} style={{ width: "100%", height: 333 }} />
            <Text style={styles.title}>Phi Phi Islands</Text>
            <Text style={styles.description}>Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the Malacca Coastal Strait of Thailand.</Text>
            <View style={{ marginVertical: 5 }}>
                <Button title="ข้อมูลเพิ่มเติม" onPress={() => alert("Simple Button pressed")}></Button>
                {/* <TouchableOpacity onPress={() => alert("Simple Button pressed")} style={styles.button}>
                <Icon name="information-circle-outline" size={24} color="white" />
                <Text style={styles.buttonText}>demo</Text>
                </TouchableOpacity> */}
            </View>
        </View>

        <View style={styles.viewlist}>
            <Image source={{ uri: 'https://www.melivecode.com/attractions/2.jpg' }} style={{ width: "100%", height: 333 }} />
            <Text style={styles.title}>Phi Phi Islands</Text>
            <Text style={styles.description}>Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the Malacca Coastal Strait of Thailand.</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>ข้อมูลเพิ่มเติม</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>ลบข้อมูล</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.viewlist}>
            <Image source={{ uri: 'https://www.melivecode.com/attractions/3.jpg' }} style={{ width: "100%", height: 333 }} />
            <Text style={styles.title}>Phi Phi Islands</Text>
            <Text style={styles.description}>Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the Malacca Coastal Strait of Thailand.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>ข้อมูลเพิ่มเติม</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.viewlist}>
            <Image source={{ uri: 'https://www.melivecode.com/attractions/4.jpg' }} style={{ width: "100%", height: 333 }} />
            <Text style={styles.title}>Phi Phi Islands</Text>
            <Text style={styles.description}>Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the Malacca Coastal Strait of Thailand.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>ข้อมูลเพิ่มเติม</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    highlight: {
      fontWeight: '800',
      fontSize: 25,
      color: '#131414',
      marginTop: 10,
      marginBottom: 10,
    },
    viewlist: {
        marginVertical: 5,
        borderWidth: 1, // Add border width
        borderColor: '#ccc', // Add border color
        borderRadius: 5, // Add border radius for rounded corners
        padding: 10, // Add padding to create space between border and content
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        color: '#131414', // Text color
    },
    description: {
        marginTop: 5,
        color: '#131414', // Text color
    },
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'space-between', // Evenly distribute buttons
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonDelete: {
        backgroundColor: '#f44336',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
  });

export default Home