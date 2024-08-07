import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialFriendsData = [
  { id: '2', name: 'Jane Smith', profilePic: 'https://randomuser.me/api/portraits/women/2.jpg', online: false, message: 'Hello', timestamp: '08-07 12:30' },
  { id: '3', name: 'Alice Johnson', profilePic: 'https://randomuser.me/api/portraits/women/3.jpg', online: true, message: 'What is your name?', timestamp: '08-07 01:15' },
  { id: '6', name: 'Diana Evans', profilePic: 'https://randomuser.me/api/portraits/women/6.jpg', online: false, message: 'Wow!', timestamp: '08-07 02:00' },
  { id: '8', name: 'Fiona Martinez', profilePic: 'https://randomuser.me/api/portraits/women/8.jpg', online: false, message: 'สวัสดีครับ', timestamp: '08-07 02:45' },
];

const FriendItem = ({ name, profilePic, online, message, timestamp, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        {online && <View style={[styles.statusIndicator, { backgroundColor: 'green' }]} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(initialFriendsData);
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Assume the height of the tab bar is around 60 (adjust if necessary)
    setTabBarHeight(60);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery); // Re-filter when search query changes
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = initialFriendsData.filter(friend =>
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFriends(filteredData);
  };

  const handleItemPress = (friend) => {
    navigation.navigate('ChatScreen', friend);
  };

  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight }]}>
      <TextInput
        style={styles.searchInput}
        placeholder="ค้นหารายชื่อ..."
        placeholderTextColor="#888" // Gray placeholder text
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredFriends}
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            profilePic={item.profilePic}
            online={item.online}
            message={item.message}
            timestamp={item.timestamp}
            onPress={() => handleItemPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 7,
    paddingRight: 7,
    marginBottom: 95,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 41,
    backgroundColor: '#e9e9e9', // Gray background
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 15, // Rounded corners
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 13,
    paddingTop: 13,
    paddingLeft: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'relative',
  },
  statusIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Gray color for message text
  },
  message: {
    fontSize: 14,
    color: '#666', // Gray color for message text
  },
  timestamp: {
    fontSize: 12,
    color: '#999', // Lighter gray color for timestamp text
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});
