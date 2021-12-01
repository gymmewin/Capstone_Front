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

//Heroku Database
// const backend_url_prefix = "https://capstone-tickets-frontend.herokuapp.com/"
//Local Database
const backend_url_prefix = "http://localhost:3000"

const App = () => {
   const [ticket, setTicket] = useState([])

   const getTicket = () => {
      axios
         .get(backend_url_prefix + '/tickets')
         .then(
            (response) => setTicket(response.data),
            (error) => console.error(error)
         )
         .catch((error) => console.error(error))
   }

   const handleCreate = (addTicket) => {
      axios
         .post(backend_url_prefix + '/tickets', addTicket)
         .then((response) => {
            console.log(response);
            getTicket()
         })
   }

   const handleDelete = (event) => {
      axios
         .delete(backend_url_prefix + '/tickets/' + event.target.value)
         .then((response) => {
            console.log(event.target.value);
            getTicket()
         })
   }

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

               </Switch>
            <Footer />
         </div>
      </Router>
      </>
   )
}

export default App;
