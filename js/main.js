$(function(){
    init()
    console.log("Main loaded");
});

function changeOrbs(index, newOrb){
    var tmp="#orb" + String(index);
    switch(newOrb){
        case ORBS.blank: $(tmp).attr("src", SRC.blank); break;
        case ORBS.red: $(tmp).attr("src", SRC.red); break;
        case ORBS.blue: $(tmp).attr("src", SRC.blue); break;
        case ORBS.green: $(tmp).attr("src", SRC.green); break;
        case ORBS. yellow: $(tmp).attr("src", SRC.yellow); break;
        case ORBS.purple: $(tmp).attr("src", SRC.purple); break;
        case ORBS.heart: $(tmp).attr("src", SRC.heart); break;
    }
}

function init(){
    console.log("init()");
    // boardInit();
    board = new Board(ROW_LEN_1, COL_LEN_1);
    board.boardInit();
    console.log(board.square);
}

//     document.getElementById("clear").addEventListener("click", clear);