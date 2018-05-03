import React from 'react';

const AddWords = (props) => {
  const letters = props.lettersRemaining;
  let stringView = "";
  for (var l in letters) {
    stringView += Array(letters[l] + 1).join(l);
  }
  return (
    <div>
      <h3>{stringView}</h3>
      <input type="text" value={props.currWord} onChange={props.editWord} onKeyPress={props.saveWord} />
    </div>
  )
}

export default AddWords;
