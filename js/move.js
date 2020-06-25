$(function(){
    $(".orbs").draggable({
        containment: $("#board"),
        stack: $(".orbs"),
        snap: $(".squares"),
        snapTolerance: 30,
        refreshPositions: true,
        grid: [100, 100],
        helper: "clone",
    });
});

$(function(){
    $(".orbs").droppable({
        over: function(e, ui){
        },
    });
});