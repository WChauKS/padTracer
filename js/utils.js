// convert assigned orb value to char equivalent
function convertOrbToText(x){
    switch(x){
        case 0: return "0"; break;
        case 1: return "R"; break;
        case 2: return "B"; break;
        case 3: return "G"; break;
        case 4: return "Y"; break;
        case 5: return "P"; break;
        case 6: return "H"; break;
    }
};

// convert image source back to orb val
function convertSrc(src){
    if(src == SRC.blank){ return ORBS_ALL.blank };
    if(src == SRC.red){ return ORBS_ALL.red };
    if(src == SRC.blue){ return ORBS_ALL.blue };
    if(src == SRC.green){ return ORBS_ALL.green };
    if(src == SRC.yellow){ return ORBS_ALL.yellow };
    if(src == SRC.purple){ return ORBS_ALL.purple };
    if(src == SRC.heart){ return ORBS_ALL.heart };
    if(src == SRC.jammer){ return ORBS_ALL.jammer };
    if(src == SRC.poison){ return ORBS_ALL.poison };
    if(src == SRC.mortal){ return ORBS_ALL.mortal };
    if(src == SRC.bomb){ return ORBS_ALL.bomb };
};

// prints board to console for quick debugging
function printBoard(){
    var tmp = "";
    for(i = 0; i < board.numOrbs; i++){
        tmp += convertOrbToText(board.square[i].orb.getColor());
    }
    console.log("\t"+tmp.substr(0,6)+"\n\t"+tmp.substr(6,6)+"\n\t"+tmp.substr(12,6)+"\n\t"+tmp.substr(18,6)+"\n\t"+tmp.substr(24,6));
}

// prints string to console to check if it matches with board
function printBoardStr(tmp) {
    console.log("Board:"+"\n\t"+tmp.substr(0,6)+"\n\t"+tmp.substr(6,6)+"\n\t"+tmp.substr(12,6)+"\n\t"+tmp.substr(18,6)+"\n\t"+tmp.substr(24,6));
}

// compares one orb with another to check if they match
function isMatch(orb1, orb2) {
    if(orb1 == orb2) return true;
    else return false;
}

function fadeRemoveOrbs(listOfOrbs, fadeTime) {
    var orbStr = "#orb";
    if(fadeTime != 0){
        for(var i = 0; i < listOfOrbs.length; i++) {
            $(orbStr + listOfOrbs[i]).fadeTo(fadeTime, 0)
        }
    }
    else {
        for(var i = 0; i < listOfOrbs.length; i++) {
            $(orbStr + listOfOrbs[i]).fadeTo(fadeTime, 100);
        }
    }
}