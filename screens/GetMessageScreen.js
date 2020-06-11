import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import TextMessage from '../components/TextMessage';

const GetMessageScreen = props => {

  const messages = useSelector(state => state.messages.messages);

  return <ScrollView contentContainerStyle={styles.list}>{messages.map((message, index) => <TextMessage key={message.id} smsMessage={message} />)}</ScrollView>;
}

GetMessageScreen.navigationOptions = navData => {

  return {
    headerTitle: 'Locate',
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    alignItems: 'center',
    justifyContent: "flex-end",
    flexGrow: 1

  }
}
);

export default GetMessageScreen; 