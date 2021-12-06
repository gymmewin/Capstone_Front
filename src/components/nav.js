import React from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
   const resetSuccessMessage = () => {
      props.setSuccessMessage('')
   }

   return(
      <nav className="mt-5">
         <h2>Capstone Tickets</h2>
         <div>
            {props.toggleLogout ?
               <div>
                  <Link to="/tickets/add" className="links" onClick={resetSuccessMessage}>Add | </Link>
                  <Link to="/tickets" className="links pr-1" onClick={resetSuccessMessage}>Home</Link>
                  <button onClick={props.handleLogout} className='btn btn-outline-danger'>Logout</button>
               </div>
               :
               <div>
                  <Link to="/users/login" className="links pr-1">Log In |</Link>
                  <Link to="/users/signup" className="links pr-1">Sign Up |</Link>
                  <Link to="/tickets/add" className="links">Add | </Link>
                  <Link to="/tickets" className="links">Home</Link>
               </div>
            }
         </div>
      </nav>
   )
}

export default Nav
