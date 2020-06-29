import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Location } from '../model/location';
import { W3W_KEY } from '../helpers/keys';


const LocationParse = (message) => {

    const locations = [];

    findWhat3Words(locations, message);

    findGridReference(locations, message);

    return locations;

}

//not so elegant to nest the promises, have a look to use nicer to read way of doing it.
const openMappingFromW3W = (loc) => {
    fetch('https://api.what3words.com/v3/autosuggest?input=' + loc + '&clip-to-country=GB&key=' + W3W_KEY)
        .then((response) => response.json())
        .then((responseJson) => {
            let mostLikely = responseJson.suggestions.filter(obj => {
                return obj.rank === 1
            });
            fetch('https://api.what3words.com/v3/convert-to-coordinates?words=' + mostLikely[0].words + '&key=' + W3W_KEY)
                .then((newResponse) => newResponse.json())
                .then((newResponseJson) => {
                    Linking.openURL('geo:' + newResponseJson.coordinates.lat + ',' + newResponseJson.coordinates.lng);
                })
        })
        .catch((error) => {
            alert(JSON.stringify(error));
        });
}

const openMappingFromGR = (loc) => {

    const coord = { easting: '', northing: '' }

    getCoordinates(coord, loc);

    fetch('http://www.bgs.ac.uk/data/webservices/CoordConvert_LL_BNG.cfc?method=BNGtoLatLng&easting=' + coord.easting + '&northing=' + coord.northing)
        .then((response) => response.json())
        .then((responseJson) => {
            Linking.openURL('geo:' + responseJson.LATITUDE + ',' + responseJson.LONGITUDE);
        })
        .catch((error) => {
            alert(JSON.stringify(error));
        });

}

const getCoordinates = (coord, loc) => {
    let firstChar = loc.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    let secondChar = loc.toUpperCase().charCodeAt(1) - 'A'.charCodeAt(0);
    if (firstChar > 7) firstChar--;
    if (secondChar > 7) secondChar--;

    // sanity check
    if (firstChar < 8 || firstChar > 18) alert(JSON.stringify("Invalid grid reference: " + loc));

    // convert grid letters into 100km-square indexes from false origin (grid square SV):
    const e100km = ((firstChar - 2) % 5) * 5 + (secondChar % 5);
    const n100km = (19 - Math.floor(firstChar / 5) * 5) - Math.floor(secondChar / 5);

    // skip grid letters to get numeric (easting/northing) part of ref
    let gridRefArray = [];
    gridRefArray = loc.substring(2).trim().split(" ");

    // if e/n not whitespace separated, split half way
    if (gridRefArray.length == 1) {
        gridRefArray = [gridRefArray[0].substring(0, gridRefArray[0].length / 2), gridRefArray[0].substring(gridRefArray[0].length / 2)];
    }

    gridRefArray[0] = gridRefArray[0].padEnd(5, '0');
    gridRefArray[1] = gridRefArray[1].padEnd(5, '0');

    coord.easting = e100km + gridRefArray[0];
    coord.northing = n100km + gridRefArray[1];

}


const findWhat3Words = (loc, message) => {
    var regex = /[^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}/i
    const location = regex.exec(message);
    if (location) {
        const element = <TouchableOpacity  key={location[0]} onPress={openMappingFromW3W.bind(this, location[0])}><Text style={styles.link}>{location[0]}</Text></TouchableOpacity>;//<TouchableOpacity onPress={OpenMappingFromW3W.bind(this, location[0])}><Text style={styles.link}>{location[0]}</Text></TouchableOpacity>;
        const address = new Location(message.indexOf(location[0]), message.indexOf(location[0]) + location[0].length, element);
        loc.push(address);
    }

}

const findGridReference = (loc, message) => {

    var regex = /([STNHOstnho][A-Za-z]\s?)(\d{5}\s?\d{5}|\d{4}\s?\d{4}|\d{3}\s?\d{3})/;
    const location = regex.exec(message);
    if (location) {
        const element = <TouchableOpacity key={location[0]} onPress={openMappingFromGR.bind(this, location[0])}><Text style={styles.link}>{location[0]}</Text></TouchableOpacity>;
        const address = new Location(message.indexOf(location[0]), message.indexOf(location[0]) + location[0].length, element);
        loc.push(address);
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