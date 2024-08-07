// BookScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';

const initialFriendsData = [
  { id: '1', name: 'John Doe', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', online: true, country: 'USA' },
  { id: '2', name: 'Jane Smith', profilePic: 'https://randomuser.me/api/portraits/women/2.jpg', online: false, country: 'Canada' },
  { id: '3', name: 'Alice Johnson', profilePic: 'https://randomuser.me/api/portraits/women/3.jpg', online: true, country: 'UK' },
  { id: '4', name: 'Bob Brown', profilePic: 'https://randomuser.me/api/portraits/men/4.jpg', online: false, country: 'Australia' },
  { id: '5', name: 'Charlie Davis', profilePic: 'https://randomuser.me/api/portraits/men/5.jpg', online: true, country: 'Germany' },
  { id: '6', name: 'Diana Evans', profilePic: 'https://randomuser.me/api/portraits/women/6.jpg', online: false, country: 'France' },
  { id: '7', name: 'Ethan Wilson', profilePic: 'https://randomuser.me/api/portraits/men/7.jpg', online: true, country: 'Italy' },
  { id: '8', name: 'Fiona Martinez', profilePic: 'https://randomuser.me/api/portraits/women/8.jpg', online: false, country: 'Spain' },
  { id: '9', name: 'George Anderson', profilePic: 'https://randomuser.me/api/portraits/men/9.jpg', online: true, country: 'Netherlands' },
  
];

const FriendItem = ({ name, profilePic, online, country }) => (
  <View style={styles.item}>
    <View style={styles.profileContainer}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
      <View style={[styles.statusIndicator, { backgroundColor: online ? 'green' : 'red' }]} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.country}>{country}</Text>
    </View>
  </View>
);

export default function BookScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(initialFriendsData);
  const [showOnlineOnly, setShowOnlineOnly] = useState(true);
  const [tabBarHeight, setTabBarHeight] = useState(0);

  useEffect(() => {
    // Assume the height of the tab bar is around 60 (adjust if necessary)
    setTabBarHeight(60);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery); // Re-filter when search query or online filter changes
  }, [searchQuery, showOnlineOnly]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = initialFriendsData.filter(friend => {
      const matchesQuery = friend.name.toLowerCase().includes(query.toLowerCase());
      const matchesOnlineFilter = !showOnlineOnly || friend.online;
      return matchesQuery && matchesOnlineFilter;
    });
    setFilteredFriends(filteredData);
  };

  const toggleOnlineFilter = () => {
    setShowOnlineOnly(!showOnlineOnly);
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
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>แสดงรายชื่อกำลังใช้งาน</Text>
        <Switch
          value={showOnlineOnly}
          onValueChange={toggleOnlineFilter}
        />
      </View>
      <FlatList
        data={filteredFriends}
        renderItem={({ item }) => <FriendItem name={item.name} profilePic={item.profilePic} online={item.online} country={item.country} />}
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 16,
    marginRight: 10,
    color: '#666', // Gray color for country text
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
    color: '#000', // Gray color for country text
  },
  country: {
    fontSize: 14,
    color: '#666', // Gray color for country text
  },
});