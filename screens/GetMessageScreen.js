import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const GetMessageScreen = props => {

  return <Text>Get message screen</Text>;
}

GetMessageScreen.navigationOptions = navData => {
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
  }
}
);

export default GetMessageScreen; 