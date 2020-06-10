import React from 'react';
import { StyleSheet, Text, View, ColorPropType } from 'react-native';
import Color from '../constants/colors';

const SettingsText = props => {
    return <Text style={{...styles.text,...props.style}}>{props.children}</Text>

    
}

const styles = StyleSheet.create({
  text: {
    fontFamily:'open-sans',
    fontSize:16,
    color:Color.primary
  }
}
);

export default SettingsText; 