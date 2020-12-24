class Board {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.square = [];
        this.hasMatches = true;
        this.numOrbs = row * column;
    }

    //fills the board's background with a checkerboard pattern
    fillSquares(i, j) {
        if ((i+j) % 2 == 0){
            return 0;
        } else {
            return 1;
        }
    }

    //takes the initial board state and appends images to the board div
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

    //initializes the board with the proper background and with each orb being red
    boardInit() {
        var k = 0;
        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.column; j++){
                this.square[k] = {background: this.fillSquares(i,j), orb: new Orb(ORBS.red)};
                k++;
            }
        }
        this.drawBoard();
    }

    //randomly assigns new orb colors and calls changeOrbs() to update the gui
    randomize() {
        var randOrb;
        for(var i = 0; i < this.numOrbs; i++){
            randOrb = Math.floor(Math.random() * (Object.keys(ORBS).length - 1)) + 1;
            this.square[i].orb.setColor(randOrb);
            changeOrbs(i, randOrb);
        }
    }

    //removes the orb by setting the orb to blank and updates gui
    removeOrb(index) {
        this.square[index].orb.setColor(ORBS.blank);
        changeOrbs(index, ORBS.blank);
    }

    //iterates over every orb and calls removeOrb to remove them
    clearBoard() {
        for(var i = 0; i < this.numOrbs; i++){
            this.removeOrb(i);
        }
    }

    // rows start with 0, 6, 12, 18, 24 and increment by 1 on each
    // returns the orb numbers in the row
    getRow(row) {
        var orbs = [];
        var i = 0;
        while(i < this.column) {
            orbs.push(row*this.column + i);
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

    //receives a list of orbs (in row and column) and minimum number to form combo to check if there are any matches
    //adds any combos found in the row/column to the combo list, which is then added to the remove list
    //checks to see if there are any blank orbs and disregards them
    getMatches(listOfOrbs, min, removeList) {
        var comboColor, nextOrbColor;
        var currentCombo = [];
        for(var i = 0; i < listOfOrbs.length; i++) {
            if(currentCombo.length == 0) {
                comboColor = this.square[listOfOrbs[i]].orb.getColor();
                if(comboColor != ORBS.blank) {
                    currentCombo.push(listOfOrbs[i]);
                }
            }
            else {
                nextOrbColor = this.square[listOfOrbs[i]].orb.getColor();
                if(comboColor != ORBS.blank && isMatch(comboColor, nextOrbColor)) {
                    currentCombo.push(listOfOrbs[i]);
                    if(i ==listOfOrbs.length - 1 && currentCombo.length >= min) {
                        this.addComboToRemoveList(removeList, currentCombo);
                    }
                }
                else {
                    if(currentCombo.length >= min) {
                        console.log("combo logged");
                        this.addComboToRemoveList(removeList, currentCombo);
                    }
                    comboColor = this.square[listOfOrbs[i]].orb.getColor();
                    currentCombo = [];
                    currentCombo.push(listOfOrbs[i]);
                }
            }
        }
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
        
        //gets matches from rows
        for(var i = 0; i < this.row; i++) {
            this.getMatches(this.getRow(i), minNumForMatch, orbsForRemoval);
        }

        //gets matches from columns
        for(var i = 0; i < this.column; i++) {
            this.getMatches(this.getColumn(i), minNumForMatch, orbsForRemoval);
        }

        if(orbsForRemoval.length > 0) {
            matchFound = true;
        }

        this.updateHasMatches(matchFound);
        console.log(orbsForRemoval);
        return orbsForRemoval;
    }

    //receives a list of the matches and calls removeOrb to remove them
    removeMatches(listOfMatches) {
        for(var i = 0; i < listOfMatches.length; i++) {
            this.removeOrb(listOfMatches[i]);
        }
    }

    //updates whether or not the board has matches
    updateHasMatches(matchFound) {
        if (matchFound) this.hasMatches = true;
        else this.hasMatches = false;
    }

    drop() {
        // do {
        //     this.removeMatches(this.checkForMatch());
        // } while(this.hasMatches == true);
        this.removeMatches(this.checkForMatch());
    }

    //after orbs are moved on the gui, it updates the internal board to reflect the changes
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