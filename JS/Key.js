/* eslint-disable import/extensions */
import create from "./utils/create.js";

export default class Key {
  constructor({ small, shift, code }) {
    this.code = code;
    this.small = small;
    this.shift = shift;
    this.isFnKey = Boolean(
      small.match(/Ctrl|arr|Alt|Shift|Tab|Del|Enter|Caps|Win|Back/)
    );

    // if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
    //   this.sub = create("div", "sub", this.shift);
    // } else {
    //   this.sub = create("div", "sub", "");
    // }

    this.letter = create("div", "letter", small);

    this.div = create("div", "keyboard_key", [this.sub, this.letter], null, [
      "code",
      this.code,
    ]);
  }
}
