// handles initial board setup

var Board = {};
Board.squares = new Array();
Board.orbs = new Array();
Board.row = {};
Board.col = {};

function fillSquares(){
    for(i=0; i<ROW_LEN_1; i++){
        for(j=0; j<COL_LEN_1; j++){
            if((i+j)%2==0){
                Board.squares.push(0);
            } else {
                Board.squares.push(1);
            }
        }
    }
}

function boardInit(){
    fillSquares();
    var divStr;
    for(i=0; i<NUM_ORBS_1; i++){
        if(Board.squares[i]==0){
            divStr="<div class=\"imgWrapper\"><img class=\"squares\" src=\"img/bg1.png\"><img id=\"orb" + i + "\" class=\"orbs\" src=\"img/bomb.png\"></div>"
        } else {
            divStr="<div class=\"imgWrapper\"><img class=\"squares\" src=\"img/bg2.png\"><img id=\"orb" + i + "\" class=\"orbs\" src=\"img/bomb.png\"></div>"
        }
        // console.log(divStr);
        $("#board").append(divStr);
    }
}
// console.log(Board.squares);