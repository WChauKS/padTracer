$(function(){
    init()
    console.log("Main loaded");
});

function changeOrbs(index, newOrb){
    var tmp="#orb" + String(index);
    switch(newOrb){
        case ORBS.red: $(tmp).attr("src", SRC.red); break;
        case ORBS.blue: $(tmp).attr("src", SRC.blue); break;
        case ORBS.green: $(tmp).attr("src", SRC.green); break;
        case ORBS. yellow: $(tmp).attr("src", SRC.yellow); break;
        case ORBS.purple: $(tmp).attr("src", SRC.purple); break;
        case ORBS.heart: $(tmp).attr("src", SRC.heart); break;
    }
}

function randomize(){
    var randOrb;
    for(i=0; i<NUM_ORBS_1; i++){
        randOrb = Math.floor(Math.random() * (Object.keys(ORBS).length - 1)) + 1;
        Board[POS[i]].orb=randOrb;
        changeOrbs(i, randOrb);
    }
    console.log("Board Randomized");
}

function clearBoard(){
    var tmp;
    for(i=0; i<NUM_ORBS_1; i++){
        Board[POS[i]].orb=ORBS.blank;
        tmp="#orb"+i;
        $(tmp).attr("src", SRC.blank);
    }
    console.log("Board Cleared");
    // console.log(Board[POS[i]].orb);
}

function init(){
    console.log("init()");
    boardInit();
}

//     document.getElementById("clear").addEventListener("click", clear);