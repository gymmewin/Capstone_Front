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
const backend_url_prefix = "https://capstone-tickets-backend.herokuapp.com"
//Local Database
// const backend_url_prefix = "http://localhost:3000"

const App = () => {
   const [ticket, setTicket] = useState([])
   const [toggleError, setToggleError] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [successMessage, setSuccessMessage] = useState('')
   const [toggleLogout, setToggleLogout] = useState(false)
   const [currentUser, setCurrentUser] = useState('')
   const [currentUser_ID, setCurrentUser_ID] = useState()

   //Sign Up Route
   const handleCreateUser = (user) => {
      axios
         .post(backend_url_prefix + '/users/signup', user)
         .then((response) => {
         if(response.data){
            console.log(response.data);
            setToggleError(false)
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
               setCurrentUser_ID(response.data[0].user_id)
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
      setCurrentUser_ID()
      setToggleLogout(false)
      setTicket([])
   }

   //Ticket Routes

   //Get Route
   const getTicket = () => {
      axios
         //gets only tickets belonging to user
         .get(backend_url_prefix + '/tickets/' + currentUser_ID)
         .then(
            (response) => setTicket(response.data),
            (error) => console.error(error)
         )
         .catch((error) => console.error(error))
   }

   //Admin Get All Route
   const getTickets = () => {
      axios
         //gets all tickets
         .get(backend_url_prefix + '/tickets/admin')
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
            console.log(response.data.message);
            setSuccessMessage(response.data.message)
            getTicket()
         })
   }

   //Delete Route
   const handleDelete = (event) => {
      axios
         .delete(backend_url_prefix + '/tickets/' + event.target.value)
         .then((response) => {
            console.log(event.target.value);
            if (currentUser_ID === 1) {
               getTickets()
            } if (currentUser_ID !==1 && currentUser_ID){
               getTicket()
            }
         })
   }

   //Update Route
   const handleUpdate = (editTicket) => {
      axios
         .put(backend_url_prefix + '/tickets/' + editTicket.tickets_id, editTicket)
         .then((response) => {
            console.log(editTicket);
            if (currentUser_ID === 1) {
               getTickets()
            } if (currentUser_ID !==1 && currentUser_ID){
               getTicket()
            }
         })
   }

   useEffect(() => {
         if (currentUser_ID === 1) {
            getTickets()
         } if (currentUser_ID !==1 && currentUser_ID){
            getTicket()
         }
   }, [currentUser_ID])

   return(
      <>
      <Router>
         <div className="container">
            <Nav handleLogout={handleLogout} toggleLogout={toggleLogout} setSuccessMessage={setSuccessMessage}/>
            <Switch>
               <Route exact path="/tickets">
                  {currentUser ?
                     <h3 className="mt-5 text-center">{currentUser}'s Ticket List:</h3>
                     :
                     <h4 className="mt-5 text-center">Welcome to Capstone Tickets. This app was designed for users to be able to create an account and submit service / repair tickets for their items. This app can be marketed for any type of business. The company can choose to use this internally  or for customer requests. Create an account or log in to test the app.</h4>
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
                  <Add handleCreate={handleCreate} currentUser_ID={currentUser_ID} successMessage={successMessage}/>
               </Route>

               <Route path="/users/signup">
                  <Signup handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage} successMessage={successMessage}/>
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
            <br/>
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
