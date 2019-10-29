import React from "react";
import {loginUser} from "./store/user.actions.js";
import {connect} from "react-redux";


function LoginPage({error, submit}) {

  function submitForm(e)
  {

    e.preventDefault();
    const userCredentials = Object.fromEntries(new FormData(e.target));
    submit(userCredentials);
  }

  return (
      <div className='page'>
        <form onSubmit={submitForm} className='form form--login'>
        <label className="inputControl form__input">
          <div className="inputControl__label">Username</div>
          <input name='username' className="inputControl__textinput inputControl__textinput--text" type="text"
                 defaultValue="demo"
          />
        </label>
        <label className="inputControl form__input">
          <div className="inputControl__label">Password</div>
          <input name='password' className="inputControl__textinput inputControl__textinput--password" type="password"
                 defaultValue="demo"
          />
        </label>
          {error && <div className="form__error">{error}</div>}
        <div className="form__actions">
          <div className="form__actionControl">
            <button type="submit" className="button button--submit">Login</button>
          </div>
        </div>
        </form>
      </div>
  )
}

export default connect(({userLoginError}) => ({error: userLoginError}), {submit: loginUser})(LoginPage);