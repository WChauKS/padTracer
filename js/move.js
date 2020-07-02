var prevPos=[];

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
            prevPos.push(e.target.id);
            // console.log(e);
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
            console.log("Hovering:", e.target.id);
            swap(prevPos[prevPos.length-2], prevPos[prevPos.length-1]);
        },
    });
});