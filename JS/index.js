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

let lang = get("kbLang") || "en";

const keyboard = new Keyboard(rowsOrder);
keyboard.init(lang);
keyboard.generateLayout();

let textarea = document.querySelector(".output");
const keyboardKeys = document.querySelectorAll(".keyboard_key");

function checkKeyboard(event) {
  textarea = document.querySelector(".output");
  const key = document.querySelector(`[data-code=${event.code}]`);
  const valueKey = document.querySelector(
    `[data-code=${event.code}] div.letter`
  );
  key.classList.add("light");
  setTimeout(() => {
    key.classList.remove("light");
  }, 500);
  if (
    event.code === "ControlLeft" ||
    event.code === "Tab" ||
    event.code === "CapsLock" ||
    event.code === "AltLeft" ||
    event.code === "AltRight" ||
    event.code === "Backspace" ||
    event.code === "Space" ||
    event.code === "ControlRight" ||
    event.code === "ShiftLeft" ||
    event.code === "ShiftRight" ||
    event.code === "MetaLeft" ||
    event.code === "Enter"
  ) {
    textarea.innerHTML += "";
  } else {
    textarea.innerHTML += valueKey.innerHTML;
  }
}
document.addEventListener("keydown", checkKeyboard);

function checkScreen(event) {
  textarea = document.querySelector(".output");
  if (
    event.target.innerHTML === "CapsLock" ||
    event.target.innerHTML === "Tab" ||
    event.target.innerHTML === "Shift" ||
    event.target.innerHTML === "Ctrl" ||
    event.target.innerHTML === "Win" ||
    event.target.innerHTML === "Alt" ||
    event.target.innerHTML === "Space" ||
    event.target.innerHTML === "Enter" ||
    event.target.innerHTML === "Del" ||
    event.target.innerHTML === "Backspace"
  ) {
    textarea.innerHTML += "";
  } else {
    textarea.innerHTML += event.target.innerHTML;
  }
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
    textarea = document.querySelector(".output");
    keyboard.changeLanguage(lang);
    textarea = document.querySelector(".output");
  }
}
document.addEventListener("keydown", pressed, false);

function up(e) {
  keyPressed[e.code] = false;
  keyPressed = {};
}

document.addEventListener("keyup", up, false);
