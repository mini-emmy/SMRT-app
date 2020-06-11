import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TextMessage = props =>{
    return <View style={styles.messageCard}>
        <Text style={styles.smsText}>{props.smsMessage.message}</Text>
    </View>
};

const styles=StyleSheet.create({
messageCard:{
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0, height:2},
    shadowRadius:8,
    elevation:5,
    borderRadius:10,
    backgroundColor:"white",
    margin:20

},
smsText:{
    fontFamily:'open-sans',
    fontSize:18,
    padding:15
}
});

export default TextMessage;