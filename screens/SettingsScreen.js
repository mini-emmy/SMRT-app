import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Keyboard } from 'react-native';
import Input from '../components/Input';
import SettingsText from '../components/SettingsText';
import SendButton from '../components/SendButton';
import { useSelector, useDispatch } from 'react-redux';
import * as settingsActions from '../store/actions/settings';

const SettingsScreen = props => {
  const SARnumber = useSelector(state => state.settings.SARnumber);
  const [SARNum, setSarNum]=useState(SARnumber);

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

  return (<ScrollView keyboardShouldPersistTaps='handled'><View style={styles.container}>
    <View style={styles.settings}>
      <SettingsText style={styles.textField}>SAR Response: </SettingsText>
      <Input value={SARNum} placeholder="Enter sarcall response number"
        onChangeText={numberChanged}
        keyboardType="number-pad" style={styles.input}></Input>
    </View>
  </View>
    <View style={styles.settingSave}><SendButton style={styles.sendButton} onPress={storeSARnumber.bind(this, SARNum)}>SAVE</SendButton></View>
  </ScrollView>)
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
    marginTop:30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    marginHorizontal:'10%'
  },
  textField: {
    textAlign: 'left',
    width:'50%'
  },
  input:{
      width: '50%'
  },
  sendButton: {
    width:150
  },
  settingSave: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal:'10%'
  }
}
);

export default SettingsScreen; 