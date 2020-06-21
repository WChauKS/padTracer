$(function(){
    init()
    console.log("Main loaded");
});

function changeOrbs(index, newOrb){
    var tmp="#orb" + String(index);
    switch(newOrb){
        case ORBS.red: $(tmp).attr("src", "img/red.png"); break;
        case ORBS.blue: $(tmp).attr("src", "img/blue.png"); break;
        case ORBS.green: $(tmp).attr("src", "img/green.png"); break;
        case ORBS. yellow: $(tmp).attr("src", "img/yellow.png"); break;
        case ORBS.purple: $(tmp).attr("src", "img/purple.png"); break;
        case ORBS.heart: $(tmp).attr("src", "img/heart.png"); break;
    }
}

function randomize(){
    var randOrb;
    for(i=0; i<NUM_ORBS_1; i++){
        randOrb = Math.floor(Math.random() * (Object.keys(ORBS).length - 1)) + 1;
        // console.log(randOrb);
        Board.orbs[i]=randOrb;
        changeOrbs(i, randOrb);
    }
    console.log("Board Randomized");
}

function clearBoard(){
    var tmp;
    for(i=0; i<NUM_ORBS_1; i++){
        Board.orbs[i]=ORBS.blank;
        tmp="#orb" + String(i);
        $(tmp).attr("src", "img/blank.png");
        // console.log(tmp);
    }
    console.log("Board Cleared");
    // console.log(Board.orbs[10]);
}

// function update(){
//     var tmp;
//     for(i=0; i<NUM_ORBS_1; i++){
//         tmp="#orbs" + String(1);
//         $("tmp").attr("src", "img/water.png");
//     }
//     console.log(tmp);
// }

function init(){
    console.log("init()");
    boardInit();
    // $("#orb0").attr("src", "img/blue.png");
}

//     document.getElementById("clear").addEventListener("click", clear);