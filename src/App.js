import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import moment from 'moment'

//components
import Add from './components/add.js'
import Edit from './components/edit.js'
import Footer from './components/footer.js'
import Nav from './components/nav.js'
import Signup from './components/signup.js'
import Login from './components/login.js'

//Heroku Database
// const backend_url_prefix = "https://capstone-tickets-frontend.herokuapp.com/"
//Local Database
const backend_url_prefix = "http://localhost:3000"

const App = () => {
   const [ticket, setTicket] = useState([])
   const [toggleLogin, setToggleLogin] = useState(true)
   const [toggleError, setToggleError] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [toggleLogout, setToggleLogout] = useState(false)
   const [currentUser, setCurrentUser] = useState({})

   //Sign Up Route
   const handleCreateUser = (user) => {
      axios
         .post(backend_url_prefix + '/users/signup', user)
         .then((response) => {
         if(response.data.email){
            console.log(response);
            setToggleError(false)
            setErrorMessage('')
            setCurrentUser(response.data)
            handleToggleLogout()
         } else {
            setErrorMessage(response.data)
            setToggleError(true)
         }
      })
   }

   //Log In Route
   const handleLogin = (user) => {
      axios
         .put(backend_url_prefix + '/users/login', user)
         .then((response) => {
            if(response.data.email){
               console.log(response);
               setToggleError(false)
               setErrorMessage('')
               setCurrentUser(response.data)
               handleToggleLogout()
            } else {
               console.log(response);
               setToggleError(true)
               setErrorMessage(response.data)
            }
         })
   }

   const handleLogout = () => {
      setCurrentUser({})
      handleToggleLogout()
   }

   const handleToggleForm = () => {
      setToggleError(false)
      if (toggleLogin === true) {
         setToggleLogin(false)
      } else {
         setToggleLogin(true)
      }
   }

   const handleToggleLogout = () => {
      if (toggleLogout) {
         setToggleLogout(false)
      } else {
         setToggleLogout(true)
      }
   }

   //Ticket Routes
   //Get Route
   const getTicket = () => {
      axios
         .get(backend_url_prefix + '/tickets')
         .then(
            (response) => setTicket(response.data),
            (error) => console.error(error)
         )
         .catch((error) => console.error(error))
   }

   //Create Route
   const handleCreate = (addTicket) => {
      axios
         .post(backend_url_prefix + '/tickets', addTicket)
         .then((response) => {
            console.log(response);
            getTicket()
         })
   }

   //Delete Route
   const handleDelete = (event) => {
      axios
         .delete(backend_url_prefix + '/tickets/' + event.target.value)
         .then((response) => {
            console.log(event.target.value);
            getTicket()
         })
   }

   //Update Route
   const handleUpdate = (editTicket) => {
      axios
         .put(backend_url_prefix + '/tickets/' + editTicket.tickets_id, editTicket)
         .then((response) => {
            console.log(editTicket);
            getTicket()
         })
   }

   useEffect(() => {
      getTicket()
   }, [])

   return(
      <>
      <Router>
         <div className="container">
            <Nav />
               <Switch>

                  <Route exact path="/tickets">
                     <h3 className="mt-3">Ticket List: </h3>
                     <div className="tickets">
                        {ticket.map((ticket) => {
                           return(
                              <div key={ticket.tickets_id}>
                                 <p><span>Item:</span> {ticket.item}</p>
                                 <p><span>Description:</span> {ticket.description}</p>
                                 <p><span>Drop-Off Date:</span> {moment(ticket.dropoff_date).format('MMM Do, YYYY')}</p>
                                 <p><span>Status:</span> {ticket.status}</p>
                                 <p><span>Notes:</span> {ticket.notes}</p>
                                 <Edit handleUpdate={handleUpdate} ticket={ticket}/>
                                 <button onClick={handleDelete} value={ticket.tickets_id} className="btn btn-outline-danger btn-sm">Delete</button>
                              </div>
                           )
                        })}
                     </div>
                  </Route>

                  <Route path="/tickets/add">
                     <Add handleCreate={handleCreate}/>
                  </Route>

                  <Route path="/users/signup">
                     <Signup handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
                  </Route>

                  <Route path="/users/login">
                     <Login handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
                  </Route>

               </Switch>
            <Footer />
         </div>
      </Router>
      </>
   )
}

export default App;

// Graveyard
// <div>
//    {toggleLogout ?
//       <button onClick={handleLogout} class='btn'>Logout</button> :
//       <div class='appFormDiv'>
//          {toggleLogin ?
//             <Login handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
//             :
//             <Signup handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
//             }
//          <button onClick={handleToggleForm} className='btn'>{toggleLogin ? 'Create an account?' : 'Already have an account?'}</button>
//          </div>
//    }
// </div>
//    {currentUser.username ?
//       <div>
//         <h1>Welcome {currentUser.username}</h1>
//       </div>
//       :
//       null
//     }
