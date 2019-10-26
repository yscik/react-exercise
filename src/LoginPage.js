import React from "react";
import {loginUser} from "./store/user.actions.js";
import {connectBasic} from "./store/store.js";


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
          <input name='username' className="inputControl__textinput inputControl__textinput--text"
           type="text" />
        </label>
        <label className="inputControl form__input">
          <div className="inputControl__label">Password</div>
          <input name='password' className="inputControl__textinput inputControl__textinput--password"
            type="password" />
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

LoginPage.storeProps = {
  state: {
    error: 'userLoginError'
  },
  actions: {
    submit: loginUser
  }
};

export default connectBasic(LoginPage);