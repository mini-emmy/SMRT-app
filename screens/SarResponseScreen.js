import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import SendButton from '../components/SendButton';
import Input from '../components/Input';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SarResponseScreen = props => {

    let customLink;
    if (Platform.OS === 'android') {

        customLink =  <TouchableOpacity onPress={()=>{props.navigation.navigate('Custom')}}><Text>Other message...</Text></TouchableOpacity> 

    }

    const sendSARHandler = () => {
        //implememnt sms functionality
    }

    return (
        <View style={styles.sarView}>
            <Input placeholder="Enter ETA" style={styles.eta} />
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

