/* eslint-disable import/extensions */
import { get, set } from "./storage.js";
import Keyboard from "./KeyBoard.js";

const rowsOrder = [
  [
    "Backquote",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backspace",
  ],
  [
    "Tab",
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
    "Backslash",
    "Delete",
  ],
  [
    "CapsLock",
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Enter",
  ],
  [
    "ShiftLeft",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ArrowUp",
    "ShiftRight",
  ],
  [
    "ControlLeft",
    "MetaLeft",
    "AltLeft",
    "Space",
    "AltRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowRight",
    "ControlRight",
  ],
];

// let lang = set("kbLang", "en");
let lang = get("kbLang") || "en";

const keyboard = new Keyboard(rowsOrder);
keyboard.init(lang);
keyboard.generateLayout();

let textarea = document.querySelector(".output");
const keyboardKeys = document.querySelectorAll(".keyboard_key");

function checkKeyboard(event) {
  textarea = document.querySelector(".output");
  const key = document.querySelector(`[data-code=${event.code}]`);
  key.classList.add("light");
  setTimeout(() => {
    key.classList.remove("light");
  }, 500);
  textarea.innerHTML += event.key;
}
document.addEventListener("keydown", checkKeyboard);

function checkScreen(e) {
  textarea = document.querySelector(".output");
  textarea.innerHTML += e.target.innerHTML;
}
keyboardKeys.forEach((el) => el.addEventListener("click", checkScreen));

let keyPressed = {};
function pressed(e) {
  keyPressed[e.code] = true;
  if (keyPressed.AltLeft === true && keyPressed.ControlLeft === true) {
    keyPressed = {};
    if (lang === "en") {
      lang = set("kbLang", "ru");
    } else {
      lang = set("kbLang", "en");
    }
    keyboard.changeLanguage(lang);
  }
}
document.addEventListener("keydown", pressed, false);

function up(e) {
  keyPressed[e.code] = false;
  keyPressed = {};
}

document.addEventListener("keyup", up, false);
