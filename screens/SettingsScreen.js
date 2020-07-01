import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Keyboard } from 'react-native';
import Input from '../components/Input';
import SettingsText from '../components/SettingsText';
import SendButton from '../components/SendButton';
import { useSelector, useDispatch } from 'react-redux';
import * as settingsActions from '../store/actions/settings';

const SettingsScreen = props => {
  const SARnumber = useSelector(state => state.settings.SARnumber);
  const [SARNum, setSarNum] = useState(SARnumber);

  const dispatch = useDispatch();

  const storeSARnumber = (Num) => {
    Keyboard.dismiss();
    dispatch(settingsActions.saveSARnumber(Num));
    props.navigation.goBack();
  };

  useEffect(() => {
    dispatch(settingsActions.getSARnumber('SARnumber'));
  }, [dispatch]);

  const numberChanged = inputText => {
    setSarNum(inputText.replace(/[^0-9]/g, ''));
  };

  return (<View style={styles.screen}><ScrollView keyboardShouldPersistTaps='handled'>
    <View style={styles.container}>
      <View style={styles.settings}>
        <SettingsText style={styles.textField}>SAR Response number: </SettingsText>
        <Input value={SARNum} placeholder="Enter response number"
          onChangeText={numberChanged}
          keyboardType="number-pad" style={styles.input}></Input>
      </View>
  </View>
      <View style={styles.settingSave}><SendButton style={styles.sendButton} onPress={storeSARnumber.bind(this, SARNum)}>SAVE</SendButton></View>
  </ScrollView>
  <View style={styles.creditSection}><Text style={styles.credit}>Created my free logo at LogoMakr.com</Text></View>
  </View>)
}

export const screenOptions = navData => {

  return {
    headerTitle: "Settings"
  };
}

const styles = StyleSheet.create({
  screen:{
    height:'100%'
  },
  container: {
    flex: 1,
  },
  settings: {
    marginTop: 30,
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginHorizontal: '5%'
  },
  textField: {
    textAlign: 'left',
    width: '90%',
    marginVertical: 10
  },
  input: {
    width: '90%',
    marginVertical: 10
  },
  sendButton: {
    width: 150
  },
  settingSave: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: '10%'
  },
  creditSection: {
    justifyContent: "flex-end",
  },
  credit: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 12,
    padding: 8,
    color: 'grey'

  }
}
);

export default SettingsScreen; 