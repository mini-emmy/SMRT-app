import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
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
    const sarNUM = useSelector(state => state.settings.SARnumber);

    useEffect(() => {
        dispatch(settingsActions.getSARnumber());
    }, [dispatch]);

    let customLink;
    // if (Platform.OS === 'android') {

    //     customLink = <TouchableOpacity onPress={() => { props.navigation.navigate('Custom') }}><Text>Other messages...</Text></TouchableOpacity>

    // }

    const sendSARHandler = () => {
        const message = "SAR A " + eta;
        SendSMS(sarNUM, message);
        setEta('');
    }

    return (
        <View style={styles.sarView}>
            <Input value={eta} onChangeText={(value) => setEta(value)} placeholder="Enter ETA" style={styles.eta} />
            <SendButton onPress={sendSARHandler}>SEND SAR A</SendButton>
            {customLink}
        </View>
    )
}

SarResponseScreen.navigationOptions = navData => {
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

