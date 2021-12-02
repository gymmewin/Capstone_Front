import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
   return(
      <nav className="mt-5">
         <h2>Capstone Tickets</h2>
         <div>
            <Link to="/users/login" className="links pr-1">Log In |</Link>
            <Link to="/users/signup" className="links pr-1">Sign Up |</Link>
            <Link to="/tickets/add" className="links">Add | </Link>
            <Link to="/tickets" className="links">Home</Link>
         </div>
      </nav>
   )
}

export default Nav
