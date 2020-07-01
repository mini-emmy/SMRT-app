import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, Platform } from 'react-native';
import SendButton from '../components/SendButton';
import Input from '../components/Input';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SendSMS } from '../helpers/smsSender';
import { useSelector, useDispatch } from 'react-redux';
import * as settingsActions from '../store/actions/settings';


const SarResponseScreen = props => {
    const dispatch = useDispatch();
    const [eta, setEta] = useState('');
    const sarNum = useSelector(state => state.settings.SARnumber);

    useEffect(() => {
        dispatch(settingsActions.getSARnumber());
    }, [dispatch]);

    const sendSARHandler = () => {
        if (!sarNum) {  
            Alert.alert(
                'Before you can send message',
                'Please specify the SAR Response number under settings to send sms.',
                [
                    { text: 'OK', onPress: () => props.navigation.navigate('Settings') }
                ],
                { cancelable: false }
            );
        }

        else {           
            const message = "SAR A " + eta;
            SendSMS(sarNum, message);
            setEta('');
        }
    }

    return (
        <View style={styles.sarView}>
            <Input value={eta} onChangeText={(value) => setEta(value)} placeholder="Enter ETA" style={styles.eta} />
            <SendButton onPress={sendSARHandler}>SEND SAR A</SendButton>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Custom') }}><Text>Other messages...</Text></TouchableOpacity>
        </View>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'SAR Response',
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

