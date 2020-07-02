// handles initial board setup
// position is set up as:
// 51	52	53	54	55	56
// 41	42	43	44	45	46
// 31	32	33	34	35	36
// 21	22	23	24	25	26
// 11	12	13	14	15	16

var Board = {};
var POS=[];
var k=0;
for(i=ROW_LEN_1; i>0; i--){
    for(j=1; j<COL_LEN_1+1; j++){
        POS[k]=String(i) + String(j);
        k++;
    }
}

function fillSquares(i, j){
    if((i+j)%2==0){
        return 0;
    } else {
        return 1;
    }
}

function drawBoard(){
    var divStr;
    for(i=0; i<NUM_ORBS_1; i++){
        if(Board[POS[i]].squares==0){
            divStr="<div id=\"imgWrapper" + i + "\" class=\"imgWrapper\"><img class=\"squares\" src=\"img/bg1.png\"><img id=\"orb" + i + "\" class=\"orbs\" src=\"img/bomb.png\"></div>"
        } else {
            divStr="<div id=\"imgWrapper" + i + "\" class=\"imgWrapper\"><img class=\"squares\" src=\"img/bg2.png\"><img id=\"orb" + i + "\" class=\"orbs\" src=\"img/bomb.png\"></div>"
        }
        // console.log(divStr);
        $("#board").append(divStr);
    }
}

function boardInit(){
    var orb="orb";
    var squares="squares";
    var k=0;
    for(i=0; i<ROW_LEN_1; i++){
        for(j=0; j<COL_LEN_1; j++){
            Board[POS[k]]={};
            Board[POS[k]][squares]=fillSquares(i, j);
            Board[POS[k]][orb]=0;
            k++;
        }
    }
    // console.log(Board);
    drawBoard();
}