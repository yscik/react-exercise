import React, {useState} from "react";
import {clamp} from "./helpers.js";

export function AutocompleteInput({source, onSelect}) {

  const [term, setTerm] = useState('');
  const [result, setResult] = useState([]);
  const [dropdownOpen, toggleDropdown] = useState(false);

  const [cursorPos, setCursorPos] = useState(0);

  async function search(input) {
    onSelect(null);
    input = input.replace(/[^a-zA-Z]/g, '');
    setTerm(input);
    if (!input) {
      toggleDropdown(false);
      setResult([]);
      return;
    }
    const result = await source(input);
    setResult(result);
    setCursorPos(0);
    toggleDropdown(true);
  }

  function highlight(item) {
    const pos = item.toLowerCase().indexOf(term.toLowerCase());
    const [t1, t2, t3] = [item.slice(0, pos), item.slice(pos, pos + term.length), item.slice(pos + term.length)];
    return <>{t1}<span className='autocomplete__highlight'>{t2}</span>{t3}</>
  }

  function handleKeyEvent(e) {
    switch (e.key) {
      case 'ArrowDown':
        moveCursor(1);
        break;
      case 'ArrowUp':
        moveCursor(-1);
        break;
      case 'Enter':
        const selectedItem = result[cursorPos];

        if(selectedItem !== term) {
          e.preventDefault();
        }
        selectedItem && selectItem(selectedItem);
        break;

      default:
        break;
    }
  }

  function moveCursor(direction) {
    const newPos = clamp(0, cursorPos + direction, result.length - 1);
    if (newPos !== cursorPos)
      setCursorPos(newPos);
  }

  function selectItem(item) {
    onSelect(item);
    setTerm(item);
    toggleDropdown(false);
  }

  function isCursorAt(index) {
    return index === cursorPos;
  }

  return (
      <div className="autocomplete" onKeyDown={handleKeyEvent}>
        <div className="autocomplete__input">
          <input name='city' className="inputControl__textinput inputControl__textinput--select" type="text"
                 value={term}
                 onChange={e => search(e.target.value)}/>
        </div>
        {dropdownOpen && <ul className="autocomplete__results">
          {result && result.map((item, index) =>
              <li className={`autocomplete__result ${isCursorAt(index) ? 'autocomplete__result--highlighted' : ''}`}
                  key={item} onClick={e => selectItem(item)}>
                  {highlight(item)}
              </li>)}
        </ul>}

      </div>

  )
}