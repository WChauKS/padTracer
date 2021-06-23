module.exports.processOrbs = function(path) {
    for(var i = 0; i < path.length; i++) {
        path[i] = getXYCoordinates(removeOrbString(path[i]));
    }
    return path;
}

/** if I am using absolute positioning, I probably will remove the code below
 * and instead just map the positions to Orb# **/

// receives a string with the format Orb##, removes 'Orb' and returns the resulting number
function removeOrbString(orbNum) {
    const removeNumChar = 3;
    orbNum = orbNum.substring(removeNumChar);
    return orbNum;
}

// receives an orb number, translates this into regular cartesian xy coordinates
// row is x, col is y
function getXYCoordinates(orbNum) {
    var x = String(orbNum % 6);
    var y = String(convertYCoordinate(Math.floor(orbNum / 6)));
    return x+y;
}

// site coordinate system has 0,0 in top left corner,
// convert y to match regular xy coordinate system
function convertYCoordinate(y) {
    switch(y) {
        case 4: y = 0; break;
        case 3: y = 1; break;
        case 2: y = 2; break;
        case 1: y = 3; break;
        case 0: y = 4; break;
    }
    return y;
}