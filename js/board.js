class Board {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.square = [];
    }

    fillSquares(i, j) {
        if ((i+j) % 2 == 0){
            return 0;
        } else {
            return 1;
        }
    }

    drawBoard() {
        var divStr;
        for(var i = 0; i < NUM_ORBS_1; i++){
            if(this.square[i].background == 0){
                divStr="<div id=\"imgWrapper" + i + "\" class=\"imgWrapper\"><img class=\"squares\" src=\"img/bg1.png\"><img id=\"orb" + i + "\" class=\"orbs\" src=\"img/red.png\"></div>"
            } else {
                divStr="<div id=\"imgWrapper" + i + "\" class=\"imgWrapper\"><img class=\"squares\" src=\"img/bg2.png\"><img id=\"orb" + i + "\" class=\"orbs\" src=\"img/red.png\"></div>"
            }
            // console.log(divStr);
            $("#board").append(divStr);
        }
    }

    boardInit() {
        var k = 0;
        for(var i = 0; i < ROW_LEN_1; i++){
            for(var j = 0; j < COL_LEN_1; j++){
                this.square[k] = {background: this.fillSquares(i,j), orb: new Orb(1)};
                k++;
            }
        }
        this.drawBoard();
    }

    randomize() {
        var randOrb;
        for(var i = 0; i < NUM_ORBS_1; i++){
            randOrb = Math.floor(Math.random() * (Object.keys(ORBS).length - 1)) + 1;
            this.square[i].orb = randOrb;
            changeOrbs(i, randOrb);
        }
    }

    clearBoard() {
        var tmp;
        for(var i = 0; i < NUM_ORBS_1; i++){
            this.square[i].orb = ORBS.blank;
            tmp = "#orb" + i;
            $(tmp).attr("src", SRC.blank);
        }
        console.log("Board Cleared");
    }

    updateAfterMove() {
        var tmp;
        var boardStr = "";
        for(var i = 0; i < NUM_ORBS_1; i++){
            tmp = "#orb" + i;
            this.square[i].orb = convertSrc($(tmp).attr("src"));
            // console.log(this.square[i].orb);
            boardStr += convertOrbToText(convertSrc($(tmp).attr("src")));
        }
        if(boardStr != "000000000000000000000000000000"){
            console.log("Orbs were dragged\n\tBoard: "+boardStr);
        }
    }
}