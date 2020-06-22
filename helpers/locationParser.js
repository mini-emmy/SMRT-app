export const locationParse = (message) => {

    const locations=[];

    findWhat3Words(locations, message);

    findGridReference(locations, message);

    return locations;

}

const findWhat3Words = (loc, message) => {

    var regex = /[^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}/i
    const location = regex.exec(message);
    console.log(message);
    loc.push(location);
  
}

const findGridReference = (loc, message) => {

    var regex = /([STNHOstnho][A-Za-z]\s?)(\d{5}\s?\d{5}|\d{4}\s?\d{4}|\d{3}\s?\d{3})/;
    const location = regex.exec(message);
    console.log(message);
    loc.push(location);

}