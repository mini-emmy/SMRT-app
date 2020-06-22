import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import TextMessage from '../components/TextMessage';
import LocationParse from '../helpers/locationParser';
import { Location} from '../model/location';

const LocationScreen = props => {

  const messages = useSelector(state => state.receivedSMS.ReceivedSMS);

  const includeLocation = (message) => {
    const locations = LocationParse(message);

    for (i = 0; i < locations.length; i++) {
      message = message.replace(location.text, location.element);
    }

    return <View style={styles.messageCard}><Text style={styles.smsText}>{message}</Text></View>




  }

  return <ScrollView contentContainerStyle={styles.list}>{messages.map((message, index) => includeLocation(message))}</ScrollView>;
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
    margin: 20

  },
  smsText:{
    fontFamily:'open-sans',
    fontSize:18,
    padding:15
},

  list: {
    alignItems: 'center',
    justifyContent: "flex-end",
    flexGrow: 1

  }
}
);

export default LocationScreen; 