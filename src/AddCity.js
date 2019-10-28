import React from "react";
import {AutocompleteInput} from "./AutocompleteInput.js";
import {Link} from "react-router-dom";

export function AddCityPage() {

  async function searchCity(term) {
    return ['Buda'+term, term+'falva','Duna'+term+'mellék']
  }
  return (
      <div className="addCity page">
        <Link to='/' className='page__backlink' />
        <form className='form'>
          <label className="inputControl form__input">
            <AutocompleteInput source={searchCity} onSelect={console.log}/>

          </label>

          <div className="form__actions">
            <div className="form__actionControl">
              <button type="submit" className="button button--submit">Save</button>
            </div>
          </div>
        </form>
      </div>
  )
}

