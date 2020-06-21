// handles input verification, format, submission, clearing and inserting for fields

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

function convertOrbToText(x){
    switch(x){
        case 1: return "R"; break;
        case 2: return "B"; break;
        case 3: return "G"; break;
        case 4: return "Y"; break;
        case 5: return "P"; break;
        case 6: return "H"; break;
    }
}

function getInputFields(){
    var inputData=[];
    var numInputBox=$(".inputBox").length;
    var inputStr="";
    var tmp="#input";
    for(i=1; i<numInputBox+1; i++){
        inputStr+=$(tmp+i).val();
    }
    // console.log(inputStr.length);
    inputLength=inputStr.length;
    inputData.push(inputLength);
    inputData.push(inputStr.toLocaleUpperCase());
    return inputData;
}

function checkForSubmit(){
    var inputData=getInputFields();
    var inputLength=inputData[0];
    // console.log(inputLength);
    if(inputLength!=30){
        $("#inputSubmit").attr("disabled", true);
        // console.log("submit=f");
    }else{
        inputStr=inputData[1];
        for(i=0; i<NUM_ORBS_1; i++){
            if(inputStr[i]=="R"||inputStr[i]=="B"||inputStr[i]=="G"||inputStr[i]=="Y"||inputStr[i]=="P"||inputStr[i]=="H"){
                $("#inputSubmit").attr("disabled", false);
            }
        }
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

function insertInputFields(){
    var numInputBox=$(".inputBox").length+1;
    var tmp="#input";
    var insertStr="";
    var position=0;
    for(i=1; i<numInputBox; i++){
        for(j=position; j<(position+numInputBox); j++){
            insertStr+=convertOrbToText(Board[POS[j]].orb);
        }
        $(tmp+i).val(insertStr);
        insertStr="";
        position+=numInputBox;
    }
}

function inputSubmit(){
    var inputData = getInputFields();
    var input=inputData[1];
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
        Board[POS[i]].orb=tmp;
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

$("#randomize")
    .on("click", function(){
        insertInputFields();
    });