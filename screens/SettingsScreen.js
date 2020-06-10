import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Input from '../components/Input';
import SettingsText from '../components/SettingsText';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const SettingsScreen = props => {
  return (<ScrollView><View style={styles.container}>
    <View style={styles.settings}>
      <SettingsText style={styles.textField}>SAR Response: </SettingsText>
      <Input keyboardType="number-pad" style={{ width: 150 }}></Input>
    </View>
  </View></ScrollView>)
}

SettingsScreen.navigationOptions = navData => {

  return {
    headerTitle: "Settings"
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settings: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  textField:{
    textAlign: 'left',
  }
}
);

export default SettingsScreen; 