import React, { useState } from 'react'
import '../App.css';

const Signup = (props) => {

  const [user_name, setUser_Name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const triggerCreateUser = (event) => {
    event.preventDefault()
    let user = {
      user_name: user_name,
      email: email,
      password: password
    }
    props.handleCreateUser(user)
  }

  return (
    <div>
      <h3 className="mt-3">Create an Account</h3>
      <form onSubmit={triggerCreateUser}>
         <input type='text' className="form-control mb-3" placeholder='name' onChange={(event)=> {setUser_Name(event.target.value)}}/>
        <input type='text' className="form-control mb-3" placeholder='email' onChange={(event)=> {setEmail(event.target.value)}}/>
        <input type='password' className="form-control mb-3" placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/>
        {props.toggleError ?
          <h5>{props.errorMessage}</h5>
          :
          null
        }
        <input type='submit' value='Sign Up' className='btn btn-outline-success'/>
      </form>
    </div>
  );
}

export default Signup;
