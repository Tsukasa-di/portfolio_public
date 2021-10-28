export function processing(type, Typing, count, roop, againRandType) {
  Typing._NUMS.randNum = Math.floor(Math.random() * Typing._prcsStr.length - 1);
  Typing._NUMS.randNum = Typing._NUMS.randNum < 0 ? Typing._NUMS.randNum * -1 : Typing._NUMS.randNum;

  if (Typing._mode === 'text') Typing._typeTarget.innerText = Typing._stack + Typing._prcsStr[Typing._NUMS.randNum] + '|';
  else Typing._typeTarget.lastChild.innerText = Typing._prcsStr[Typing._NUMS.randNum] + '|';

  delete Typing._NUMS.randNum;

  if (count == Typing._NUMS.prcsSum - 1 && type == 'async') {
    shiftNextStr();
  } else if (count % Typing._NUMS.prcsSum === 0 && type == 'inRAF') {
    shiftNextStr();
  } else {
    if (againRandType) againRandType();
  }

  function shiftNextStr() {
    // 次の文字の印字にシフトする前の処理
    // ------------------------------------------
    if (Typing._mode === 'text') {
      Typing._stack += Typing._inputAry[Typing._NUMS.typeCount];
      Typing._typeTarget.innerText = Typing._stack;
    } else {
      Typing._typeTarget.lastChild.innerText = Typing._inputAry[Typing._NUMS.typeCount];
      Typing._typeTarget.appendChild(document.createElement('span'));
    }
    Typing._NUMS.typeCount++;
    if (roop) roop();
  }
}
