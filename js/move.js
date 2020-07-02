var prevPos=[];
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

$(function(){
    $(".orbs").draggable({
        containment: $("#board"),
        stack: $(".orbs"),
        snap: $(".squares"),
        snapTolerance: 30,
        refreshPositions: true,
        grid: [100, 100],
        helper: "clone",
        // helper: function(e){
        //     return 
        // },
        start: function(e, ui){
            prevPos=[];
            origin=e.target.id;
            prevPos.push(origin);
            // console.log(e);
        },
        drag: function(e, ui){
            if(ui.position.top==0 && ui.position.left==0){
                if(prevPos[prevPos.length-1]!=origin){
                    prevPos.push(origin);
                    swap(prevPos[prevPos.length-2], prevPos[prevPos.length-1]);
                }
            }
        },
        stop: function(e, ui){
            console.log(prevPos);
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
            prevPos.push(e.target.id);
            // console.log("Hovering:", e.target.id);
            swap(prevPos[prevPos.length-2], prevPos[prevPos.length-1]);
        },
    });
});