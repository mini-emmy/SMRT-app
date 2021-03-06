import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Location } from '../model/location';
import { W3W_KEY } from '../helpers/keys';


const LocationParse = (message) => {

    const locations = [];

    findWhat3Words(locations, message);

    findGridReference(locations, message);

    findPostCodes(locations, message);

    return locations;

}

//not so elegant to nest the promises, have a look to use nicer to read way of doing it.
const openMappingFromW3W = (loc) => {
    loc = loc.replace(/,/g,".");
    loc = loc.replace(/\//g,".");
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

const openMappingFromPostCode = (loc) => {
    loc=loc.replace(' ','');
    fetch('https://postcodes.io/postcodes/' + loc)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            Linking.openURL('geo:' + responseJson.result.latitude + ',' + responseJson.result.longitude);
        })
        .catch((error) => {
            alert(JSON.stringify(error));
        });


}


const findWhat3Words = (locArray, message) => {
    var regex = /[^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・,/.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・,/.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}/ig
    var location;
    do {
        location = regex.exec(message);
        if (location) {
            const element = <TouchableOpacity style={styles.block} key={location[0]} onPress={openMappingFromW3W.bind(this, location[0])}><Text style={styles.link}>{location[0]}</Text></TouchableOpacity>;
            const address = new Location(message.indexOf(location[0]), message.indexOf(location[0]) + location[0].length, element);
            locArray.push(address);
        }
    } while (location);


}

const findGridReference = (locArray, message) => {

    var regex = /([STNHOstnho][A-Za-z]\s?)(\d{5}\s?\d{5}|\d{4}\s?\d{4}|\d{3}\s?\d{3})/g;
    var location;
    do {
        location = regex.exec(message);
        if (location) {
            const element = <TouchableOpacity style={styles.block} key={location[0]} onPress={openMappingFromGR.bind(this, location[0])}><Text style={styles.link}>{location[0]}</Text></TouchableOpacity>;
            const address = new Location(message.indexOf(location[0]), message.indexOf(location[0]) + location[0].length, element);
            locArray.push(address);
        }
    } while (location);

}

findPostCodes = (locArray, message) => {
    var regex = /(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))/g;
    var location;
    do {
        location = regex.exec(message);
        if (location) {
            const element = <TouchableOpacity style={styles.block} key={location[0]} onPress={openMappingFromPostCode.bind(this, location[0])}><Text style={styles.link}>{location[0]}</Text></TouchableOpacity>;
            const address = new Location(message.indexOf(location[0]), message.indexOf(location[0]) + location[0].length, element);
            locArray.push(address);
        }
    } while (location);


}

const styles = StyleSheet.create({
    link: {
        color: 'black',
        fontFamily: 'open-sans',
        fontSize: 18

    },
    block:{
        width:'auto',
        alignItems: 'center',
        backgroundColor:"#bce8f1",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal:10
    }
})

export default LocationParse;