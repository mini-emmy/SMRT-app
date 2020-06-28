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



  const messages = useSelector(state => state.receivedSMS.ReceivedSMS);
  const [message, setMessage] = useState('');
  const [showLocations, setShowLocations] = useState(false);

  let locationView = <TextInput multiline={true} value={message} onChangeText={(value) => setMessage(value)} placeholder="Copy and paste message" style={styles.input}></TextInput>;

  const findLocations = () => {
    Keyboard.dismiss();
    setShowLocations(true);
  }

  const clearLocation = () => {
    Keyboard.dismiss();
    setMessage('');
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
    locationView = <View>{locationsSection.map((item) => { return item })}</View>

  }


  return <ScrollView keyboardShouldPersistTaps='always'>
    <View style={styles.messageCard}>
      {locationView}
    </View>
    <SendButton style={styles.locButton} onPress={findLocations}>Find Locations</SendButton>
    <SendButton style={styles.locButton} onPress={clearLocation}>Clear</SendButton>
  </ScrollView>

}

LocationScreen.navigationOptions = navData => {
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageCard: {
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
  locButton: {
    marginHorizontal: 20
  },
  locations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  input: {
    height: 200,
    fontSize: 18

  },
  locationMessage: {
    fontSize: 18
  },
  list: {
    alignItems: 'center',
    justifyContent: "flex-end",
    flexGrow: 1

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