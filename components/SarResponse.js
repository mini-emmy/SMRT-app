import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SendButton from '../components/SendButton';
import Input from '../components/Input';

const SarResponse = props => {

    const sendSARHandler = () => {
        //implememnt sms functionality
    }

    return (
        <View style={styles.sarView}>
            <Input hint="Enter ETA" style={styles.eta}>
            </Input>
            <SendButton onPress={sendSARHandler}>SEND SAR A</SendButton>
        </View>
    )
}

const styles = StyleSheet.create({
  sarView: {
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eta :{
      width:'50%'
  }
}
);

export default SarResponse; 

