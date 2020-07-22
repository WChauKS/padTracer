var dragPath = [];
var origin = "";

/*******************************************************
 * MOVING ORBS
 * swap()
 * draggable
 * droppable
*******************************************************/
// gets img source of previous position and current position and swaps them
function swap(prev, cur){
    // adding # to use as ID
    var prevElement = "#" + prev;
    var curElement = "#" + cur;
    
    // storing img src
    prevSrc = $(prevElement).attr("src");
    curSrc = $(curElement).attr("src");

    // update both sources
    $(prevElement).attr("src", curSrc);
    $(curElement).attr("src", prevSrc);
}

$(function(){
    $(".orbs").draggable({
        containment: $("#board"),
        stack: $(".orbs"),
        snap: $(".squares"),
        snapTolerance: 30,
        refreshPositions: true,
        grid: [100, 100],
        helper: "clone",
        start: function(e, ui){
            dragPath = [];
            origin = e.target.id;
            dragPath.push(origin);
        },
        drag: function(e, ui){
            if(ui.position.top == 0 && ui.position.left == 0){
                if(dragPath[dragPath.length-1] != origin){
                    dragPath.push(origin);
                    swap(dragPath[dragPath.length - 2], dragPath[dragPath.length - 1]);
                }
            }
        },
        stop: function(e, ui){
            board.updateAfterMove();
            // drop();
            // console.log("Path taken: "+dragPath);    //full path of orb drag is saved here
        },
    });
});

$(function(){
    $(".orbs").droppable({
        accept: ".orbs",
        over: function(e, ui){
            // e is the object targeted
            // ui is object being dragged
            ui.helper.css('z-index', "30");   // brings clone to front
            dragPath.push(e.target.id);
            // console.log("Hovering:", e.target.id);
            swap(dragPath[dragPath.length-2], dragPath[dragPath.length-1]);
        },
    });
});

/*******************************************************
 * BUTTONS
 * inputSubmit()
 * clear
 * randomize
*******************************************************/

// handles updating the saved orbs and updating the board view
function inputSubmit(){
    var inputData = getInputFields();
    var input = inputData[1];
    // console.log(input);
    var tmp;
    for(i = 0; i < NUM_ORBS_1; i++){
        // console.log(input.charCodeAt(i));
        switch(input.charCodeAt(i)){
            case KEY.r: tmp = ORBS.red; break;//R
            case KEY.b: tmp = ORBS.blue; break;//B
            case KEY.g: tmp = ORBS.green; break;//G
            case KEY.h: tmp = ORBS.heart; break;//H
            case KEY.p: tmp = ORBS.purple; break;//P
            case KEY.y: tmp = ORBS.yellow; break;//Y
        }
        board.square[i].orb = tmp;
        changeOrbs(i, tmp);
    }
    console.log("Input was accepted\n\tBoard: " + input);
}

// appends on click function to clear button to clear input fields
$("#clear")
    .on("click", function(){
        board.clearBoard();
        clearInputFields();
    });

// appends on click function to fill input fields to correspond to what is in the board view
$("#randomize")
    .on("click", function(){
        board.randomize();
        var inputStr = "";
        for(i = 0; i < NUM_ORBS_1; i++){
            inputStr += convertOrbToText(board.square[i].orb);
        }
        console.log("Board was randomized\n\tBoard: " + inputStr);
        insertInputFields(inputStr);
        checkForSubmit();
    });

/*******************************************************
 * INPUT FIELDS
 * verifyInput()
 * getInputFields()
 * checkForSubmit()
 * clearInputFields()
 * insertInputFields()
 * paste
*******************************************************/

// prevents invalid character from being entered into the input fields
function verifyInput(){
    var e = event||window.event;
    var key = e.keyCode||e.which;
    // console.log(key);
    switch(key){
        case KEY.backspace: break;
        case KEY.delete: break;
        case KEY.left: break;
        case KEY.right: break;
        // case KEY.v: break;
        case KEY.r: break;
        case KEY.b: break;
        case KEY.g: break;
        case KEY.h: break;
        case KEY.p: break;
        case KEY.y: break;
        default:
            if(e.preventDefault) e.preventDefault;
            e.returnValue = false;
    }
}

// gets data from each field, combines into a string, and counts the number of valid characters
function getInputFields(){
    var inputData = [];
    var numInputField = $(".inputField").length;
    var inputStr = "";
    var tmp = "#input";
    for(i = 1; i < numInputField+1; i++){
        inputStr += $(tmp+i).val();
    }
    // console.log(inputStr.length);
    inputLength = inputStr.length;
    inputData.push(inputLength);
    inputData.push(inputStr.toLocaleUpperCase());
    return inputData;
}

// if the number of valid characters is correct, submit button will be enabled, else it will stay disabled
function checkForSubmit(){
    var inputData = getInputFields();
    var inputLength = inputData[0];
    // console.log(inputLength);
    if(inputLength != 30){
        $("#inputSubmit").attr("disabled", true);
        // console.log("submit=f");
    }else{
        inputStr = inputData[1];
        // console.log(inputStr);
        var validCheck = 0;
        for(i = 0; i < NUM_ORBS_1; i++){
            if(inputStr[i] == "R"
                || inputStr[i] == "B"
                || inputStr[i] == "G"
                || inputStr[i] == "Y"
                || inputStr[i] == "P"
                || inputStr[i] == "H"
            ){
                // $("#inputSubmit").attr("disabled", false);
                validCheck++;
            }
        }
        // console.log(validCheck);
        if(validCheck == NUM_ORBS_1){
            $("#inputSubmit").attr("disabled", false);
            // console.log("submit=t");
        } else {
            $("#inputSubmit").attr("disabled", true);
        }
    }
}

// clears all of the input fields
// called when clear is pressed, or anytime each field is expected to be filled by another function
function clearInputFields(){
    var numInputField = $(".inputField").length;
    var tmp = "#input";
    for(i = 1; i < numInputField + 1; i++){
        $(tmp + i).val("");
    }
}

// a string is passed to this function to insert into the appropriate field
// if string is not long enough, it will fill up to the correct amount
// if string is too long, it will only take the appropriate amount
function insertInputFields(x){
    var numInputField = $(".inputField").length + 1;
    var tmp = "#input";
    var insertStr = "";
    var position = 0;
    for(i = 1; i < numInputField; i++){
        for(j = position; j < (position + numInputField); j++){
            if(j < x.length){
                insertStr += x[j];
            } else {
                insertStr += "";
            }
        }
        $(tmp + i).val(insertStr);
        insertStr = "";
        position += numInputField;
    }
}

$(".inputField")
    //fired when key is released
    //advances to the next input field when current one is filled
    .keyup(function(){
        var $inputField = $(this);
        var numChar = $inputField.val().length;
        var maxLength = $inputField.attr("maxLength");
        if(numChar == maxLength){
            $inputField.next().focus();
        }
        checkForSubmit();
    })
    //fired when key is pressed
    .keydown(function(){
        verifyInput();
        // console.log($("#input1").value);
    })
    .bind("paste", function(){
        checkForSubmit();
    })

// handles pasting into the input fields
// currently allows for only right click -> paste
$("#input1")
    .bind("paste", function(e){
        var pastedData = e.originalEvent.clipboardData.getData('text');
        // pasteInputFields(pastedData);
        console.log("Pasted Data: " + pastedData);
        clearInputFields();
        insertInputFields(pastedData);
        checkForSubmit();
    });