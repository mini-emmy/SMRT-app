import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Text, Keyboard, Button } from 'react-native';
import SendButton from '../components/SendButton';
import Input from '../components/Input';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as messageActions from '../store/actions/message';
import DeleteMessage from '../components/DeleteMessage';


const CustomMessageScreen = props => {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [showNewMessageBox, setShowNewMessageBox] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const messages = useSelector(state => state.messages.messages);

    useEffect(() => {
        dispatch(messageActions.getSARMessages());

    }, []);


    const sendSARHandler = (message) => {
        console.log("message send " + message);
    }

    const saveCustomMessage = () => {
        Keyboard.dismiss();
        if (!messages.includes(newMessage)) {
            dispatch(messageActions.addSARMessage(newMessage));
        }
        setShowNewMessageBox(false);
    }

    const deleteMessage = (message) => {
        dispatch(messageActions.deleteSARMessage(message));
        setDeleteMode(false);

    }

    let smsMessages;

    if (deleteMode) {
        smsMessages = messages.map((item, index) => { return <DeleteMessage key={item} onPress={deleteMessage.bind(this, item)}> {item} </DeleteMessage> });
    }

    else {
        smsMessages = messages.map((item, index) => { return <SendButton style={styles.messageButton} key={item} onPress={saveCustomMessage.bind(this, item)}> {item} </SendButton> });
    }

    let customMessageBox;

    if (showNewMessageBox) {

        customMessageBox = <View style={styles.messageCard}>
            <Input onChangeText={(value) => setNewMessage(value)} placeholder="Enter you own message" style={styles.input}></Input>
            <SendButton onPress={saveCustomMessage}>SAVE</SendButton>
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

CustomMessageScreen.navigationOptions = navData => {
    return {
        headerTitle: 'SAR Custom Response',
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

flex:1
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

    },
    messageCard: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20
    }
}
);

export default CustomMessageScreen;

