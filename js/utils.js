// prints board to console for quick debugging
function printBoard(){
    var tmp="";
    for(i=0; i<board.numOrbs; i++){
        tmp+=convertOrbToText(board.square[i].orb);
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