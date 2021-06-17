var ORBS = { blank: 0, red: 1, blue: 2, green: 3, yellow: 4, purple: 5, heart: 6 };
// TODO: add in jammer: 7, poison: 8, bomb: 9
var ORBS_ALL = { blank: 0, red: 1, blue: 2, green: 3, yellow: 4, purple: 5, heart: 6, jammer: 7, poison: 8, mortal: 9, bomb: 10 };
var SRC = { blank: "img/blank.png", red: "img/red.png", blue: "img/blue.png", green: "img/green.png", yellow: "img/yellow.png", purple: "img/purple.png", heart: "img/heart.png", jammer: "img/jammer.png", poison: "img/poison.png", mortal: "img/mortal.png", bomb: "img/bomb.png" };
var KEY = { escape: 27, backspace: 8, delete: 46, left: 37, right: 39, v: 86, r: 82, b: 66, g: 71, y: 89, p: 80, h: 72, j: 74, x: 88, m: 77, e: 69 };
var DIR = { up:1, down: 2, right: 3, left: 4 };
var ROW_LEN_1 = 5;
var COL_LEN_1 = 6;