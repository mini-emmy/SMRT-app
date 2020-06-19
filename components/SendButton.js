import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors.js';

const SendButton = props => {

    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 10

    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign:'center'

    }
});


export default SendButton;

