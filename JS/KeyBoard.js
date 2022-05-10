/* eslint-disable import/extensions */
// import * as storage from "./storage.js";
import create from "./utils/create.js";
import language from "./lang/language.js";
import Key from "./Key.js";

const main = create("main", "", [
  create("h1", "title", "RSS Виртуальная клавиатура"),
]);

const info = create("main", "", [
  create("h3", "subtitle", "Клавиатура создана в операционной системе macOS"),
  create(
    "p",
    "hint",
    "Для переключения языка комбинация: Ctrl + Opt (Ctrl+Alt для Windows)"
  ),
]);

export default class KeyBoard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.ifCaps = false;
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = create(
      "textarea",
      "output",
      null,
      main,
      ["placeholder", "Start type something..."],
      ["rows", 5],
      ["cols", 50],
      ["spellcheck", false],
      ["autocorrect", "off"]
    );
    this.container = create("div", "body--keyboard keyboard", null, main, [
      "language",
      langCode,
    ]);
    document.body.prepend(main);
    document.body.append(info);
    return this;
  }

  changeLanguage(lang) {
    this.keyBase = language[lang];
    this.container.remove();
    this.container = create("div", "body--keyboard keyboard", null, main, [
      "language",
      lang,
    ]);
    this.generateLayout();
  }

  generateLayout() {
    this.keyButtons = [];
    this.rowsOrder.forEach((row, i) => {
      const rowElement = create("div", "key_row", null, this.container, [
        "row",
        i + 1,
      ]);
      rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1 fr)`;
      row.forEach((code) => {
        const keyObj = this.keyBase.find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.div);
        }
      });
    });
  }
}
