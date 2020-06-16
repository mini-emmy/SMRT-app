import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SendButton from '../components/SendButton';
import Input from '../components/Input';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const SarResponseScreen = props => {

    const sendSARHandler = () => {
        //implememnt sms functionality
    }

    return (
        <View style={styles.sarView}>
            <Input placeholder="Enter ETA" style={styles.eta}/>   
            <SendButton onPress={sendSARHandler}>SEND SAR A</SendButton>
        </View>
    )
}

SarResponseScreen.navigationOptions = navData => {
    return {
        headerTitle: 'SAR Response',
        headerRight:()=>(
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
    sarView: {
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eta: {
        width: '50%'
    }
}
);

export default SarResponseScreen;

