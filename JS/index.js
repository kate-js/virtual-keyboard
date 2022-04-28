/* eslint-disable import/extensions */
import { get } from "./storage.js";
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

const lang = get("kbLang", '"en"');

new Keyboard(rowsOrder).init(lang).generateLayout();

const textarea = document.querySelector(".output");
const keyboardKeys = document.querySelectorAll(".keyboard_key");

function checkKeyboard(event) {
  console.log(event.target);
  const key = document.querySelector(`[data-code=${event.code}]`);
  key.classList.add("light");
  setTimeout(() => {
    key.classList.remove("light");
  }, 500);
  // textarea.innerHTML += event.target.key.textContent;
}
document.addEventListener("keydown", checkKeyboard);

// function checkScreen(e) {
//   //checkLight();
//   console.log(e.target);
//   // textarea.innerHTML += e.target.textContent;
// }
// keyboardKeys.forEach((el) => el.addEventListener("click", checkScreen));
