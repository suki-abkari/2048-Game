/*
Global variables
Monitoring
*/
var move_up = true; //(1)
var move_down = true; //(2)
var move_left = true; //(3)
var move_right = true; //(4)

/*Game Over*/
function gameOver() {
  if (!move_up && !move_down && !move_left && !move_right) {
    document.getElementById("gameover").style.visibility = "visible";
  }
}

/*Start a new game*/
function new_game() {
  document.getElementById("gameover").style.visibility = "hidden";
  //It runs 5 times with values from i = 1 to 5
  for (var i = 1; i < 5; i++) {
    //It runs 5 times with values from j = 1 to 5
    for (var j = 1; j < 5; j++) {
      document.getElementById("b" + i + j).innerHTML = ""; // itera sobre cada elemento del wrapper (box)>
    }
  }
  newNum();
  move_up = false;
  move_down = false;
  move_left = false;
  move_right = false;
}

/*Directions on the keyboard*/
//The onekeypress event occurs when the user presses a key (on the keyboard).
document.onkeypress = function (event) {
  //The keyCode property returns the Unicode character code of the key that triggered the onkeypress event.
  switch (event.keyCode) { 
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
    default:
  }
};

/*Generate a new number 2 or 4*/
function newNum() {
  var randomNum = Math.random();
  //A simple conditional that executes one of the two possible instructions that corresponds to the previous evaluation of a condition.
  var newNumber = randomNum > 0.5 ? 2 : 4;
  while (true) {
    //Here is were the random number is generated beetween 0 and 4. (Into the rows and columns 4*4)
    var row = Math.ceil(Math.random() * 4);
    var column = Math.ceil(Math.random() * 4);
    var boxes = document.getElementById("b" + row + column);
    if (boxes.innerHTML == "") {
      boxes.innerHTML = newNumber;
      break;
    }
  }
}

//Move up (1)
function up() {
  var new_num = [];
  var target;
  var exist = false;
  //It runs 5 times with values from i = 1 to 5 (Loop through the first array)
  for (var i = 1; i < 5; i++) {
    //It runs 5 times with values from j = 2 to 5 (Loop that goes through the array that is in position i)
    for (var j = 2; j < 5; j++) {
      //var j = 2; => (j + i)
      var self_box = document.getElementById("b" + j + i);
      if (self_box.innerHTML != "") {
        //With values from k = 1 and k < j or 5 (Loop that goes through the array that is in position i y j)
        for (var k = 1; k < j; k++) {
          var pre_box = document.getElementById("b" + (j - k) + i);
          if (pre_box.innerHTML == "") {
            target = pre_box;
            exist = true;
          } else if (
            self_box.innerHTML == pre_box.innerHTML &&
            new_num[+((j - k).toString() + i)] == undefined
          ) {
            pre_box.innerHTML = 2 * self_box.innerHTML;
            document.getElementById("score").innerHTML =
              +document.getElementById("score").innerHTML +
              +pre_box.innerHTML;
            self_box.innerHTML = "";
            new_num[+((j - k).toString() + i)] = 1;
            move_up = true;
          } else {
            break;
          }
        }
        if (exist) {
          target.innerHTML = self_box.innerHTML;
          self_box.innerHTML = "";
          move_up = true;
          exist = false;
        }
      }
    }
    new_num = [];
  }
  if (move_up) {
    newNum();
    move_up = false;
  }
}
//Move down (2)
function down() {
  var new_num = [];
  var target;
  var exist = false;
  for (var i = 1; i < 5; i++) {
     //It runs 3 times with values from j = 0 to 5 (Loop that goes through the array that is in position i)
     //j = 3; j > 0; j-- => j = j - 1;   (3, 2, 1, 0)
    for (var j = 3; j > 0; j--) {
      var self_box = document.getElementById("b" + j + i);
      //The code is checking if value is available (!=)
      if (self_box.innerHTML != "") {
         //With values from k = j and k < j or 5 (Loop that goes through the array that is in position i y j)
        for (var k = j + 1; k < 5; k++) {
          //As k = j with just jave to concatenate by calling the "b" + k + i. 
          var pre_box = document.getElementById("b" + k + i);
          //If the value es avalable set true and push into pre_box and innerHTML
          if (pre_box.innerHTML == "") {
            target = pre_box;
            exist = true;
          } else if (
            self_box.innerHTML == pre_box.innerHTML &&
            //In the empty array we convert the elements in to strings. ¿?
            new_num[+(k.toString() + i)] == undefined
          ) {
            pre_box.innerHTML = 2 * self_box.innerHTML;
            document.getElementById("score").innerHTML =
              +document.getElementById("score").innerHTML +
              +pre_box.innerHTML;
            self_box.innerHTML = "";
            new_num[+(k.toString() + i)] = 1;
            move_down = true;
            exist = false;
          } else {
            break;
          }
        }
        if (exist) {
          target.innerHTML = self_box.innerHTML;
          self_box.innerHTML = "";
          move_down = true;
          exist = false;
        }
      }
    }
    new_num = [];
  }
  if (move_down) {
    newNum();
    move_down = false;
  }
}
//move to the left (3)
function left() {
  var new_num = [];
  var target;
  var exist = false;
  //It runs 5 times with values from i = 1 to 5 (Loop through the first array)
  for (var j = 1; j < 5; j++) {
    for (var i = 2; i < 5; i++) {
      var self_box = document.getElementById("b" + j + i);
      if (self_box.innerHTML != "") {
        for (var k = 1; k < i; k++) {
          var pre_box = document.getElementById("b" + j + (i - k));
          if (pre_box.innerHTML == "") {
            target = pre_box;
            exist = true;
          } else if (
            self_box.innerHTML == pre_box.innerHTML &&
            new_num[+(j + (i - k).toString())] == undefined
          ) {
            pre_box.innerHTML = 2 * self_box.innerHTML;
            document.getElementById("score").innerHTML =
              +document.getElementById("score").innerHTML +
              +pre_box.innerHTML;
            self_box.innerHTML = "";
            new_num[+(j + (i - k).toString())] = 1;
            move_left = true;
            exist = false;
          } else {
            break;
          }
        }
        if (exist) {
          target.innerHTML = self_box.innerHTML;
          self_box.innerHTML = "";
          move_left = true;
          exist = false;
        }
      }
    }
    new_num = [];
  }
  if (move_left) {
    newNum();
    move_left = false;
  }
}
//move right (4)
function right() {
  var new_num = [];
  var target;
  var exist = false;
  for (var j = 1; j < 5; j++) {
    for (var i = 3; i > 0; i--) {
      var self_box = document.getElementById("b" + j + i);
      if (self_box.innerHTML != "") {
        for (var k = i + 1; k < 5; k++) {
          var pre_box = document.getElementById("b" + j + k);
          if (pre_box.innerHTML == "") {
            target = pre_box;
            exist = true;
          } else if (
            self_box.innerHTML == pre_box.innerHTML &&
            new_num[+(j.toString() + k)] == undefined
          ) {
            pre_box.innerHTML = 2 * self_box.innerHTML;
            document.getElementById("score").innerHTML =
              +document.getElementById("score").innerHTML +
              +pre_box.innerHTML;
            self_box.innerHTML = "";
            new_num[+(j.toString() + k)] = 1;
            move_right = true;
            exist = false;
          } else {
            break;
          }
        }
        if (exist) {
          target.innerHTML = self_box.innerHTML;
          self_box.innerHTML = "";
          move_right = true;
          exist = false;
        }
      }
    }
    new_num = [];
  }
  if (move_right) {
    newNum();
    move_right = false;
  }
}

//coloring
setInterval(function paint() {
  for (var i = 1; i < 5; i++) {
    for (var j = 1; j < 5; j++) {
      var box = document.getElementById("b" + i + j);
      switch (box.innerHTML) {
        case "2":
          box.style.backgroundColor = "orange";
          box.style.color = "#000000";
          break;
        case "4":
          box.style.backgroundColor = "goldenrod";
          box.style.color = "#000000";
          break;
        case "8":
          box.style.backgroundColor = "chocolate";
          box.style.color = "white";
          break;
        case "16":
          box.style.backgroundColor = "sienna";
          box.style.color = "#ffffff";
          break;
        case "32":
          box.style.backgroundColor = "brown";
          box.style.color = "#ffffff";
          break;
        case "64":
          box.style.backgroundColor = "maroon";
          box.style.color = "#ffffff";
          break;
        case "128":
          box.style.backgroundColor = "firebrick";
          box.style.color = "#ffffff";
          break;
        case "256":
          box.style.backgroundColor = "crimson";
          box.style.color = "#FAF6F7";
          break;
        case "512":
          box.style.backgroundColor = "#ECC850";
          box.style.color = "#FAF4F6";
          break;
        case "1024":
          box.style.backgroundColor = "#EDC53F";
          box.style.color = "#F9F4FA";
          break;
        case "2048":
          box.style.backgroundColor = "#E9B501";
          box.style.color = "#FFFCB0";
          break;
        case "4096":
          box.style.backgroundColor = "darkred";
          box.style.color = "#524B39";
          break;
        default:
          box.style.backgroundColor = "#FBEFE3";
      }
    }
  }
}, 10);

/********************/
/********Form*******/
/********************/

console.log("Reloaded");

// dom variables
var msf_getFsTag = document.getElementsByTagName("fieldset");

// declaring the active fieldset & the total fieldset count
var msf_form_nr = 0;
var fieldset = msf_getFsTag[msf_form_nr];
fieldset.className = "msf_show";

// creates and stores a number of bullets
var msf_bullet_nr = "<div class='msf_bullet'></div>";
var msf_length = msf_getFsTag.length;
for (var i = 1; i < msf_length; ++i) {
    msf_bullet_nr += "<div class='msf_bullet'></div>";
};
// injects bullets
var msf_bullet_o = document.getElementsByClassName("msf_bullet_o");
for (var i = 0; i < msf_bullet_o.length; ++i) {
    var msf_b_item = msf_bullet_o[i];
    msf_b_item.innerHTML = msf_bullet_nr;
};

// removes the first back button & the last next button
document.getElementsByName("back")[0].className = "msf_hide";
document.getElementsByName("next")[msf_bullet_o.length - 1].className = "msf_hide";

// Makes the first dot active
var msf_bullets = document.getElementsByClassName("msf_bullet");
msf_bullets[msf_form_nr].className += " msf_bullet_active";

// Validation loop & goes to the next step
function msf_btn_next() {
    var msf_val = true;

    var msf_fs = document.querySelectorAll("fieldset")[msf_form_nr];
    var msf_fs_i_count = msf_fs.querySelectorAll("input").length;

    for (i = 0; i < msf_fs_i_count; ++i) {
        var msf_input_s = msf_fs.querySelectorAll("input")[i];
        if (msf_input_s.getAttribute("type") === "button") {
            // nothing happens
        } else {
            if (msf_input_s.value === "") {
                msf_input_s.style.backgroundColor = "pink";
                msf_val = false;
            } else {
                if (msf_val === false) {} else {
                    msf_val = true;
                    msf_input_s.style.backgroundColor = "lime";
                }
            }
        };
    };
    if (msf_val === true) {
        // goes to the next step
        var selection = msf_getFsTag[msf_form_nr];
        selection.className = "msf_hide";
        msf_form_nr = msf_form_nr + 1;
        var selection = msf_getFsTag[msf_form_nr];
        selection.className = "msf_show";
        // refreshes the bullet
        var msf_bullets_a = msf_form_nr * msf_length + msf_form_nr;
        msf_bullets[msf_bullets_a].className += " msf_bullet_active";
    }
};

// goes one step back
function msf_btn_back() {
    msf_getFsTag[msf_form_nr].className = "msf_hide";
    msf_form_nr = msf_form_nr - 1;
    msf_getFsTag[msf_form_nr].className = "msf_showhide";
};

console.log("loaded");