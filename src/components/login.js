import React, { useState } from 'react'
import '../App.css';

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const triggerLogin = (event) => {
    event.preventDefault()
    let user = {
      email: email,
      password: password
    }
    props.handleLogin(user)
  }


  return (
    <div>
      <h3 className="mt-3">Log In</h3>
      <form onSubmit={triggerLogin}>
        <input type='text' className="form-control mb-3" placeholder='email' onChange={(event)=> {setEmail(event.target.value)}}/>
        <input type='password' className="form-control mb-3" placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/>
        {props.toggleError ?
          <h5 class='errorMsg'>{props.errorMessage}</h5>
          :
          null
        }
        <input type='submit' value='Login' className='btn btn-outline-success'/>
      </form>
    </div>
  );
}

export default Login;
