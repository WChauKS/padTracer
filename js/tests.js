function getTestCase(test){
    switch(test){
        // test for input functions
        case 1: return "RRRRRRBBBBBBGGGGGGYYYYYYPPPPPP";     // simple 5 color board
        case 2: return "RRRRRRBBBBBBGGGGGGYYYYYYPPPP";       // too little orbs
        case 3: return "RRRRRRBBBBBBGGGGGGYYYYYYPPPPPPHH";   // too many orbs
        case 4: return "RBGYPHRBGYPHRBGYPHRBGYPHRBGYPH";     // simple 6 color board

        // bi color full clear boards
        // row
        case 5: return "RRRRRRBBBBBBRRRRRRBBBBBBRRRRRR";    // exp: 5c
        // row with blobbing
        case 6: return "RRRRRRRRRRRRBBBBBBRRRRRRRRRRRR";    // exp: 3c
        // column
        case 7: return "RBRBRBRBRBRBRBRBRBRBRBRBRBRBRB";    // exp: 6c
        // column with blobbing
        case 8: return "RRBBRRRRBBRRRRBBRRRRBBRRRRBBRR";    // exp: 3c
        // match 3
        case 9: return "RRRBBBBBBRRRRRRBBBBBBRRRRRRBBB";    // exp: 10c
        // vdp/match3
        case 10: return "RRRBBBRRRBBBRRRBBBBBBRRRRRRBBB";   // exp: 6c
        // vertical match 3 with connected row
        case 11: return "RBRBRBRBRBRBRBRBRBBBBBBBRRRRRR";   // exp: 5c
        // horizontal match 3 with connected column
        case 12: return "RRRBRBBBBBRBRRRBRBBBBBRBRRRBRB"    // exp: 6c
        // blob with single cascade
        case 13: return "RRBBRRRRBBRRBBBBBBRRBBRRRRBBRR";   // exp: 3c

        // tri color
        // multiple cascades
        case 14: return "HHHHHHHHHHHHHHRBHHHRBRBHRBBBRR";   // exp: 5c
    }
}

function inputTest(){
    // var testCase = parseInt($("#testCase").val());
    var tmp;
    var testStr=getTestCase(parseInt($("#testCase").val()));
    // console.log(testStr);
    // clearInputFields();
    console.log(testStr);
    insertInputFields(testStr);
    for(i=0; i<NUM_ORBS_1; i++){
        switch(testStr.charCodeAt(i)){
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
}