import React from 'react';

const AddWords = (props) => {
  const letters = props.lettersRemaining;
  let stringView = "";
  for (var l in letters) {
    stringView += Array(letters[l] + 1).join(l);
  }
  return (
    <div id="add-words">
      <h3 id="letters-remaining">{stringView}</h3>
      <input className="input-text" type="text" value={props.currWord} onChange={props.editWord} onKeyPress={props.saveWord} />
    </div>
  )
}

export default AddWords;
