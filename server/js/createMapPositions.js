module.exports.createMap = function() {
    // gCode is in the format: G0 X## Y## Z##
    // xDist and yDist is the distance in millimeters of the tiles on my physical phone
    // zDist is the distance 
    // xOffset and yOffset is the distance between G28 (home) and my phone measured in millimeters
    const xDist = 11;
    const yDist = 11;
    const xOffset = 0;
    const yOffset = 0;
    const zDist = '10';
    var gCodeMap = new Map();
    for(i = 0; i < 6; i++) {
        for(j=0; j < 5; j++) {
            gCodeMap[String(i) + String(j)] = {
                'X': String(i * xDist + xOffset),
                'Y': String(j * yDist + yOffset),
                'Z': zDist
            }
        }
    }
    return gCodeMap;
}