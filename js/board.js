class Board {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.square = [];
        this.hasMatches = true;
        this.numOrbs = row * column;
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
        for(var i = 0; i < this.numOrbs; i++){
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
        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.column; j++){
                this.square[k] = {background: this.fillSquares(i,j), orb: new Orb(1)};
                k++;
            }
        }
        this.drawBoard();
    }

    randomize() {
        var randOrb;
        for(var i = 0; i < this.numOrbs; i++){
            randOrb = Math.floor(Math.random() * (Object.keys(ORBS).length - 1)) + 1;
            this.square[i].orb.setColor(randOrb);
            changeOrbs(i, randOrb);
        }
    }

    removeOrb(index) {
        this.square[index].orb.setColor(0);
    }

    clearBoard() {
        for(var i = 0; i < this.numOrbs; i++){
            this.removeOrb(i);
            changeOrbs(i, 0);
        }
        console.log("Board Cleared");
    }

    updateAfterMove() {
        var tmp;
        var boardStr = "";
        for(var i = 0; i < this.numOrbs; i++){
            tmp = "#orb" + i;
            this.square[i].orb.setColor(convertSrc($(tmp).attr("src")));
            // console.log(this.square[i].orb);
            boardStr += convertOrbToText(convertSrc($(tmp).attr("src")));
        }
        if(boardStr != "000000000000000000000000000000"){
            console.log("Orbs were dragged");
            printBoardStr(boardStr);
        }
    }
    // updateAfterDrop() {}
}