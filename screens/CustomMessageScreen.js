import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, TextInput, TouchableOpacity, View, ScrollView, Text, Keyboard, Button } from 'react-native';
import SendButton from '../components/SendButton';
import Input from '../components/Input';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as messageActions from '../store/actions/message';
import DeleteMessage from '../components/DeleteMessage';
import { SendSMS } from '../helpers/smsSender';


const CustomMessageScreen = props => {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [showNewMessageBox, setShowNewMessageBox] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const messages = useSelector(state => state.messages.messages);
    const sarNum = useSelector(state => state.settings.SARnumber);

    useEffect(() => {
        dispatch(messageActions.getSARMessages());

    }, []);


    const sendSARHandler = (message) => {
        if (!sarNum) {   // Works on both Android and iOS}
            Alert.alert(
                'Error',
                'Please specify the SAR Response number under settings to send sms.',
                [
                    { text: 'OK', onPress: () => props.navigation.navigate('Settings') }
                ],
                { cancelable: false }
            );
        }

        else {
            SendSMS(sarNum, message);
        }
    }

    const saveCustomMessage = () => {
        Keyboard.dismiss();
        if (!messages.includes(newMessage) || newMessage === '') {
            dispatch(messageActions.addSARMessage(newMessage));
        }
        setShowNewMessageBox(false);
    }

    const deleteMessage = (message) => {
        dispatch(messageActions.deleteSARMessage(message));
        setDeleteMode(false);

    }

    const closeMessageBox = () => {
        Keyboard.dismiss();
        setShowNewMessageBox(false);
    }

    let smsMessages;

    if (deleteMode) {
        smsMessages = messages.map((item, index) => { return <DeleteMessage key={item} onPress={deleteMessage.bind(this, item)}> {item} </DeleteMessage> });
    }

    else {
        smsMessages = messages.map((item, index) => { return <SendButton style={styles.messageButton} key={item} onPress={sendSARHandler.bind(this, item)}> {item} </SendButton> });
    }

    let customMessageBox;

    if (showNewMessageBox) {

        customMessageBox = <View style={styles.messageCard}>
            <TextInput multiline={true} onChangeText={(value) => setNewMessage(value)} placeholder="Enter your own message" style={styles.input}></TextInput>
            <View style={styles.buttonArea}>
                <SendButton style={styles.saveButton} onPress={closeMessageBox}>CANCEL</SendButton>
                <SendButton style={styles.saveButton} onPress={saveCustomMessage}>SAVE</SendButton>
            </View>
        </View>
    }

    return (<View style={styles.screen}>
        {customMessageBox}
        <ScrollView contentContainerStyle={styles.list}>
            {smsMessages}
        </ScrollView>

        <View style={styles.editButtons}>
            <TouchableOpacity onPress={() => { setShowNewMessageBox(true); }}><Text>Add message...</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { setDeleteMode(true); }}><Text>Delete message...</Text></TouchableOpacity>
        </View>
    </View>

    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Custom Response',
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
    screen: {

        flex: 1,
        textAlignVertical:'center'

    },
    list: {
        padding: 20
    },
    sarView: {
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    messageButton: {
        margin: 0
    },

    editButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20

    },
    input: {
        height: 200,
        width: '90%',
        fontSize: 18

    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: '7%'

    },
    saveButton: {
        marginHorizontal: 10

    },

    messageCard: {
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        padding: 10
    }
}
);

export default CustomMessageScreen;

