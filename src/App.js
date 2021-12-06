import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//moment is a library that allows your to format dates easily
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
   const [toggleError, setToggleError] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [toggleLogout, setToggleLogout] = useState(false)
   const [currentUser, setCurrentUser] = useState('')

   //Sign Up Route
   const handleCreateUser = (user) => {
      axios
         .post(backend_url_prefix + '/users/signup', user)
         .then((response) => {
         if(response.data){
            console.log(response.data.error);
            setToggleError(false)
            setErrorMessage('')
            setCurrentUser(response.data)
         } else {
            setToggleError(true)
            setErrorMessage(response.data.error)
         }
      })
   }

   //Log In Route
   const handleLogin = (user) => {
      axios
         .put(backend_url_prefix + '/users/login', user)
         .then((response) => {
            console.log(response.data[0]);
            try {
               setToggleError(false)
               setCurrentUser(response.data[0].user_name)
               setToggleLogout(true)
            } catch (error) {
               console.log(response.data);
               setToggleError(true)
               setErrorMessage(response.data.error)
            }
         })
   }

   const handleLogout = () => {
      setCurrentUser('')
      setToggleLogout(false)
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
            console.log(addTicket);
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
            <Nav handleLogout={handleLogout} toggleLogout={toggleLogout}/>
            <Switch>
               <Route exact path="/tickets">
                  {currentUser ?
                     <h3 className="mt-3">{currentUser}'s Ticket List:</h3>
                     :
                     <h3 className="mt-3">Ticket List:</h3>
                  }
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
                  <div className="mt-5 text-center">
                     {currentUser ?
                        <h3>Welcome {currentUser}</h3>
                        :
                        null
                     }
                  </div>
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
// 200 or 2xx - no error occured - server was able to complete request without issue
// 400 - client side issue, the requst the person made was invalid
// 500 - server side issue, when the server processed your request, something went wrong, unable to finish request.
//first digit corresponds to what happens

// <div>
//    {toggleLogout ?
//       <button onClick={handleLogout} class='btn'>Logout</button> :
//       <div>
//          {toggleLogin ?
//             <Login handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
//             :
//             <Signup handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
//             }
//       </div>
//    }
// </div>
