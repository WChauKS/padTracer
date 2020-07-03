var dragPath=[];
var origin="";

// gets img source of previous position and current position and swaps them
function swap(prev, cur){
    // adding # to use as ID
    var prevElement="#"+prev;
    var curElement="#"+cur;
    
    // storing img src
    prevSrc=$(prevElement).attr("src");
    curSrc=$(curElement).attr("src");

    // update both sources
    $(prevElement).attr("src", curSrc);
    $(curElement).attr("src", prevSrc);
}

function convertSrc(src){
    if(src==SRC.blank){return ORBS_ALL.blank};
    if(src==SRC.red){return ORBS_ALL.red};
    if(src==SRC.blue){return ORBS_ALL.blue};
    if(src==SRC.green){return ORBS_ALL.green};
    if(src==SRC.yellow){return ORBS_ALL.yellow};
    if(src==SRC.purple){return ORBS_ALL.purple};
    if(src==SRC.heart){return ORBS_ALL.heart};
    if(src==SRC.jammer){return ORBS_ALL.jammer};
    if(src==SRC.poison){return ORBS_ALL.poison};
    if(src==SRC.mortal){return ORBS_ALL.mortal};
    if(src==SRC.bomb){return ORBS_ALL.bomb};
}

function updateBoardAfterMove(){
    var tmp;
    boardStr="";
    for(i=0; i<NUM_ORBS_1; i++){
        tmp="#orb"+i;
        Board[POS[i]].orb=convertSrc($(tmp).attr("src"));
        boardStr+=convertOrbToText(convertSrc($(tmp).attr("src")));
    }
    if(boardStr!="000000000000000000000000000000"){
        console.log("Orbs were dragged\n\tBoard: "+boardStr);
    }
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
            dragPath=[];
            origin=e.target.id;
            dragPath.push(origin);
        },
        drag: function(e, ui){
            if(ui.position.top==0 && ui.position.left==0){
                if(dragPath[dragPath.length-1]!=origin){
                    dragPath.push(origin);
                    swap(dragPath[dragPath.length-2], dragPath[dragPath.length-1]);
                }
            }
        },
        stop: function(e, ui){
            updateBoardAfterMove();
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