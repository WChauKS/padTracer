$(function(){
    init()
    console.log("Main loaded");
});

function init(){
    console.log("init()");
    board = new Board(ROW_LEN_1, COL_LEN_1);
    board.boardInit();
}