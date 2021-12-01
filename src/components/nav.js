import React from 'react'

const Nav = () => {
   return(
      <nav className="mt-5">
         <h2>Capstone Tickets</h2>
         <div>
            <a href="/tickets/login" className="links pr-1">Log In |</a>
            <a href="/tickets/signup" className="links pr-1">Sign Up |</a>
            <a href="/tickets/add" className="links">Add | </a>
            <a href="/tickets" className="links">Home</a>
         </div>
      </nav>
   )
}

export default Nav
