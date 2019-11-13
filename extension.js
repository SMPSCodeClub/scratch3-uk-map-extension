const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');


class Scratch3ML4KUKMap {

    constructor() {

        this.TOP_LEFT = {
            mapCoordsX : -34, mapCoordsY : 138,
            lat : 57.8677, lon : -5.7539
        };
        this.BOTTOM_RIGHT = {
            mapCoordsX : 138, mapCoordsY : -175,
            lat : 50.094, lon : 1.4349
        };

        this.LAT_RANGE = this.BOTTOM_RIGHT.lat - this.TOP_LEFT.lat;
        this.LON_RANGE = this.BOTTOM_RIGHT.lon - this.TOP_LEFT.lon;

        this.X_RANGE = this.BOTTOM_RIGHT.mapCoordsX - this.TOP_LEFT.mapCoordsX;
        this.Y_RANGE = this.BOTTOM_RIGHT.mapCoordsY - this.TOP_LEFT.mapCoordsY;

    }


    getInfo () {
        return {
            id : 'mlforkidsUKMap',
            name : 'UK Map',

            blocks: [
                {
                    opcode : 'ukMapX',
                    text : 'map X coordinate for [LATITUDE] , [LONGITUDE]',
                    blockType : BlockType.REPORTER,
                    arguments : {
                        LATITUDE : {
                            type : ArgumentType.NUMBER,
                            defaultValue : 50.6787
                        },
                        LONGITUDE : {
                            type : ArgumentType.NUMBER,
                            defaultValue : -1.5667
                        }
                    },
                },
                {
                    opcode : 'ukMapY',
                    text : 'map Y coordinate for [LATITUDE] , [LONGITUDE]',
                    blockType : BlockType.REPORTER,
                    arguments : {
                        LATITUDE : {
                            type : ArgumentType.NUMBER,
                            defaultValue : 50.6787
                        },
                        LONGITUDE : {
                            type : ArgumentType.NUMBER,
                            defaultValue : -1.5667
                        }
                    },
                }
            ]
        }
    }


    ukMapX (args) {
        return this._latlonToMapCoords(parseFloat(args.LATITUDE, 10), parseFloat(args.LONGITUDE, 10)).x;
    }
    ukMapY (args) {
        return this._latlonToMapCoords(parseFloat(args.LATITUDE, 10), parseFloat(args.LONGITUDE, 10)).y;
    }

    _latlonToMapCoords (lat, lon){

        const percentY = ((lat - this.BOTTOM_RIGHT.lat) / this.LAT_RANGE);
        const percentX = ((lon - this.BOTTOM_RIGHT.lon) / this.LON_RANGE);

        return {
            x: this.BOTTOM_RIGHT.mapCoordsX + (percentX * this.X_RANGE)
            y: this.BOTTOM_RIGHT.mapCoordsY + (percentY * this.Y_RANGE)
        };
    }
}



module.exports = Scratch3ML4KUKMap;
