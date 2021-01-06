// info content
var BASIC_ABOUT = "<p>Combos are made by connecting 3 or more orbs horizontally or vertically. Drag the orbs around and make as many combos as possible. After dropping the orb, the combos will be removed and any orbs above the now empty space will drop to fill that space. The buttons will be locked while orbs are dropping, and unlocked when it is finished.<p>";
var INPUT_INSTR = "<p>The 5 fields above the board represent each row. You can enter each orb individually or you can right click on the first field and paste in a string of 30 colors. It will automatically break the string up and populate the correct fields. For example: </p><p style=\"text-align: center\">HHHHHHHHHHHHHHRBHHHRBRBHRBBBRR</p>";
var SKYFALL_DES = "<p><span style=\"color: #2196F3\">Skyfall toggle</span> enables/disables the board from creating new orbs after orb matches and drops. This gives a small chance for more combos to be made.</p>";
var RANDOM_DES = "<p><span style=\"color: #2196F3\">Randomize</span> will change the entire board to random orbs. The input fields will also be updated to reflect the changes.</p>";
var CLEAR_DES = "<p><span style=\"color: #2196F3\">Clear</span> will clear the entire board. The input fields will also be cleared.</p>";

// opens popup by pressing button
$("#infoBtn")
    .on("click", function(){
        toggleInfoPopup("open");
    });

// closes popup with button
$("#closeInfoBtn")
    .on("click", function(){
        toggleInfoPopup("close");
    });

// closes popup with ESC key
$(document).keyup(function(e) {
    if(e.keycode == KEY.escape || e.which == KEY.escape){
        toggleInfoPopup("close");
    }});

// closes popup by clicking outside of the popup (on the overlay)
$(document).click(function(e){
    var $target = $(e.target);
    if($target[0].className == "overlay") {
        toggleInfoPopup("close");
    }});

// shows and hides the popup and overlay
function toggleInfoPopup(mode) {
    if(mode == "open"){
        $("#infoPopup").toggleClass("active");
        $("#info").html(BASIC_ABOUT + INPUT_INSTR + SKYFALL_DES + RANDOM_DES + CLEAR_DES);
    }
    else $("#infoPopup").removeClass("active");
}