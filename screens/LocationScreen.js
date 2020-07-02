import React, { useState } from 'react';
import { StyleSheet, Keyboard, ScrollView, Text, View, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import TextMessage from '../components/TextMessage';
import LocationParse from '../helpers/locationParser';
import { Location } from '../model/location';
import SendButton from '../components/SendButton';

const LocationScreen = props => {

  const [message, setMessage] = useState('');
  const [showLocations, setShowLocations] = useState(false);

  let locationView = <TextInput multiline={true} value={message} onChangeText={(value) => setMessage(value)} placeholder="Copy and paste message" style={styles.input}></TextInput>;

  const findLocations = () => {
    if (message !== '') {
      Keyboard.dismiss();
      setShowLocations(true);
    }
  }

  const clearMessage = () => {
    setMessage('');
    setShowLocations(false);
  }

  const editMessage = () => {
    setShowLocations(false);
  }

  if (showLocations) {
    let newMessage = message;
    const locations = LocationParse(newMessage);
    locations.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));


    let locationsSection = [];

    let start = 0;

    for (let i = 0; i < locations.length; i++) {
      let partMessage = <Text style={styles.locationMessage} key={start}>{newMessage.substring(start, locations[i].indexStart)}</Text>
      locationsSection.push(partMessage);
      locationsSection.push(locations[i].element);
      start = locations[i].indexEnd;
    }

    let lastMessagePart = <Text style={styles.locationMessage} key={start}>{newMessage.substring(start)}</Text>
    locationsSection.push(lastMessagePart);
    locationView = <View style={styles.message}>{locationsSection.map((item) => { return item })}</View>

  }


  return <ScrollView keyboardShouldPersistTaps='always'>
    <View style={styles.messageCard}>
      {locationView}
    </View>
    <SendButton style={styles.locButton} onPress={findLocations}>Find Locations</SendButton>
    <View style={styles.editButtons}>
      <SendButton style={styles.editButton} onPress={editMessage}>Edit</SendButton>
      <SendButton style={styles.editButton} onPress={clearMessage}>Clear</SendButton>
    </View>
  </ScrollView>

}

export const screenOptions = navData => {
  return {
    headerTitle: 'Locate',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-settings"
          onPress={() => {
            navData.navigation.navigate('Settings');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  locButton: {
    marginHorizontal: '10%'
  },
  editButton:{
    width:'45%',
    marginHorizontal:'5%'
  },
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:'10%'
  },
  input: {
    height: 200,
    fontSize: 18,
    width: '90%'
  },
  message:{
    minHeight:200
  },
  locationMessage: {
    fontSize: 18
  },
  messageCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10

  },
}
);

export default LocationScreen; 