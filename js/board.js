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

    // rows start with 0, 6, 12, 18, 24 and increment by 1 on each
    // returns the orb numbers in the row
    getRow(row) {
        var orbs = [];
        var i = 0;
        while(i < this.column) {
            orbs.push(row*6 + i);
            i++
        }
        return orbs;
    }

    // columns start with 0, 1, 2, 3, 4, 5 and increment by 6 on each
    // returns the orb numbers in the column
    getColumn(column) {
        var orbs = [];
        for(var i = column; i < this.numOrbs; i += 6) {
            orbs.push(i);
        }
        return orbs;
    }

    //receives a list of orbs (in row and column) to check if there are any matches
    //adds any combos found to the remove list
    getMatches(removeList, uncheckedListOfOrbs) {

    }

    //receives a list of orb numbers that make up the combo and adds it to the remove list
    addComboToRemoveList(removeList, comboOrbNums) {
        for(var tmp = 0; tmp < comboOrbNums.length; tmp++) {
            removeList.push(comboOrbNums[tmp]);
        }
    }

    //calls getMatches on each row and column and stores any combos to the remove list
    //updates matchFound
    checkForMatch() {
        var matchFound = false;
        var minNumForMatch = 3;     //minimum number to be considered a match
        var orbsForRemoval = [];    //orb positions of combos found so that they can be removed
        
        for(var i = 0; i < this.row; i++) {
            var comboColor, nextOrbColor;
            var currentCombo = [];
            var row = this.getRow(i);
            // console.log(row);
            for(var j=0; j<row.length; j++) {
                if(currentCombo.length == 0) {
                    comboColor = this.square[row[j]].orb.getColor();
                    currentCombo.push(row[j]);
                }
                else {
                    nextOrbColor = this.square[row[j]].orb.getColor();
                    if(isMatch(comboColor, nextOrbColor)) {
                        currentCombo.push(row[j]);
                        if(j==row.length-1 && currentCombo.length >= minNumForMatch) {
                            this.addComboToRemoveList(orbsForRemoval, currentCombo);
                        }
                    }
                    else {
                        if(currentCombo.length >= minNumForMatch) {
                            console.log("combo logged");
                            this.addComboToRemoveList(orbsForRemoval, currentCombo);
                        }
                        comboColor = this.square[row[j]].orb.getColor();
                        currentCombo = [];
                        currentCombo.push(row[j]);
                    }
                }
            }
        }

        for(var i = 0; i < this.column; i++) {
            var column = this.getColumn(i);
            // console.log(column);
        }

        console.log(orbsForRemoval);

        this.updateHasMatches(matchFound);
        return matchFound;
    }

    // removeMatches(x) {
    //     console.log(x);
    // }

    updateHasMatches(matchFound) {
        if (matchFound == false) this.hasMatches = false;
        else this.hasMatches = true;
    }

    // drop() {
    //     do {
    //         this.removeMatches(this.checkForMatch());
    //     } while(this.hasMatches == true);
    // }

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