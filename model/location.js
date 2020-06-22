export class LocationType {
    W3W = "W3W";
    GR = "GRID_REF";

}

export class Location {
    constructor(text, type, element) {
        this.text = text;
        this.type = type;
        this.element=element;
    }


}