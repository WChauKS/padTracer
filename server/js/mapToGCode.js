module.exports.createGCode = function(map, key) {
    const startStr = 'G0 ';
    var xStr = 'X' + map[key]['X'] + ' ';
    var yStr = 'Y' + map[key]['Y'] + ' ';
    var zStr = 'Z' + map[key]['Z'] + '\n';
    var gCode = startStr + xStr + yStr + zStr;
    return gCode;
}