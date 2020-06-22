import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Location } from '../model/location';


const LocationParse = (message) => {

    const locations = [];

    findWhat3Words(locations, message);

    findGridReference(locations, message);

    return locations;

}

const openW3W = (loc) => {
    Linking.openURL('w3w://show?loc');
}

const convertToW3W = (location) => {
    return "escalates.visitors.brains";
}

const findWhat3Words = (loc, message) => {

    var regex = /[^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}/i
    const location = regex.exec(message);
    if (location) {
        const element = <TouchableOpacity onPress={openW3W(location)}><Text style={styles.link}>{location}</Text></TouchableOpacity>;
        console.log(message);
        loc.push(new Location(location, element));
    }

}

const findGridReference = (loc, message) => {

    var regex = /([STNHOstnho][A-Za-z]\s?)(\d{5}\s?\d{5}|\d{4}\s?\d{4}|\d{3}\s?\d{3})/;
    const location = regex.exec(message);
    if (location) {
        const w3w = ConvertToW3W(location);
        const element = <TouchableOpacity onPress={openW3W(w3w)}><Text style={styles.link}>{location}</Text></TouchableOpacity>;
        console.log(message);
        loc.push(new Location(location, element));
    }

}

const styles = StyleSheet.create({
    link: {
        color: 'red',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default LocationParse;