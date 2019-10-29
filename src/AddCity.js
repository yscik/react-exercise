import React, {useState} from "react";
import {AutocompleteInput} from "./AutocompleteInput.js";
import {Link} from "react-router-dom";
import {apiGet} from "./api.js";
import {connect} from "react-redux";
import {addCity} from "./store/user.actions.js";
import { useHistory } from "react-router-dom";

function AddCityPage({authtoken, dispatch}) {

  const [selectedCity,selectCity] = useState(null);
  const history = useHistory();

  async function searchCity(term) {
    return apiGet(`city/search?term=${term}`, {authtoken, dispatch, background: true})
  }

  function addSelectedCity() {

    dispatch(addCity(selectedCity));
    history.push('/')

  }

  return (
      <div className="addCity page">
        <Link to='/' className='page__backlink' />
        <form className='form' onSubmit={addSelectedCity}>
          <label className="inputControl form__input">
            <AutocompleteInput source={searchCity} onSelect={selectCity}/>

          </label>

          <div className="form__actions">
            <div className="form__actionControl">
              {selectedCity && <button type="submit" className="button button--submit">Save</button>}
            </div>
          </div>
        </form>
      </div>
  )
}

export default connect(({authtoken}) => ({authtoken}))(AddCityPage)