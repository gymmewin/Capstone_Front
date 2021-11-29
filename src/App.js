import React from 'react'
import axios from 'axios'
import './App.css';

//components
import Add from '.components/add.js'
import Edit from '.components/edit.js'
import Footer from '/components/footer.js'

//Heroku Database
// const backend_url_prefix = "https://capstone-tickets-frontend.herokuapp.com/"
//Local Database
const backend_url_prefix = "http://localhost:3000/"

const App = () => {
   const [tickets, setTickets] = useState([])

   const getTickets = () => {
      axios
         .get(backend_url_prefix + '/tickets')
         .then(
            (response) => setTickets(response.data),
            (error) => console.error(error)
         )
         .catch((error) => console.error(error))
   }

   const handleCreate = (addTicket) => {
      axios
         .post(backend_url_prefix + '/tickets', addTicket)
         .then((response) => {
            console.log(response);
            getTickets()
         })
   }

   const handleDelete = (event) => {
      axios
         .delete(backend_url_prefix + '/tickets/' + event.target.value)
         .then((response) => {
            getTickets()
         })
   }

   useEffect(() => {
      getTickets()
   }, [])

   return(
      <>
         <h1>Capstone Tickets</h1>

         <Footer />
      </>
   )
}

export default App;
