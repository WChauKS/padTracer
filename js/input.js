// handles input verification, format, submission, and clearing of fields

function verifyInput(){
    var e = event || window.event;
    var key = e.keyCode || e.which;
    // console.log(key);
    switch(key){
        case KEY.backspace: break;
        case KEY.delete: break;
        case KEY.left: break;
        case KEY.right: break;
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

function getInputFields(x){
    var numInputBox=$(".inputBox").length;
    var inputStr="";
    var tmp="#input";
    for(i=1; i<numInputBox+1; i++){
        inputStr+=$(tmp+i).val();
    }
    // console.log(inputStr.length);
    inputLength=inputStr.length;
    switch(x){
        case 1: return inputLength; break;
        case 2: return inputStr.toUpperCase(); break;
    }
}

function checkForSubmit(){
    var inputLength=getInputFields(1);
    console.log(inputLength);
    if(inputLength!=30){
        $("#inputSubmit").attr("disabled", true);
        // console.log("submit=f");
    }else{
        $("#inputSubmit").attr("disabled", false);
        // console.log("submit=t");
    }
}

function clearInputFields(){
    var numInputBox=$(".inputBox").length;
    var tmp="#input";
    for(i=1; i<numInputBox+1; i++){
        $(tmp+i).val("");
    }
}

function inputSubmit(){
    var input = getInputFields(2);
    console.log(input);
    var tmp;
    for(i=0; i<NUM_ORBS_1; i++){
        // console.log(input.charCodeAt(i));
        switch(input.charCodeAt(i)){
            case KEY.r: tmp=ORBS.red; break;//R
            case KEY.b: tmp=ORBS.blue; break;//B
            case KEY.g: tmp=ORBS.green; break;//G
            case KEY.h: tmp=ORBS.heart; break;//H
            case KEY.p: tmp=ORBS.purple; break;//P
            case KEY.y: tmp=ORBS.yellow; break;//Y
        }
        Board.orbs[i]=tmp;
        changeOrbs(i, tmp);
    }
    console.log("Input accepted\n\tBoard Changed");
}

$(".inputBox")
    //fired when key is released
    //advances to the next input field when current one is filled
    .keyup(function(){
        var $inputBox=$(this);
        var numChar=$inputBox.val().length;
        var maxLength=$inputBox.attr("maxLength");
        if(numChar==maxLength){
            $inputBox.next().focus();
        }
        checkForSubmit();
    })
    //fired when key is pressed
    .keydown(function(){
        verifyInput();
        // console.log($("#input1").value);
        // checkForSubmit();
    })

$("#clear")
    .on("click", function(){
        clearInputFields();
    });