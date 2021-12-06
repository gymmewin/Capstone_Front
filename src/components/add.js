import React, { useState } from 'react'

const Add = (props) => {
   const [ticket, setTicket] = useState({item: '', description: '', user_id:props.currentUser_ID})

   const handleChange = (event) => {
      setTicket({...ticket, [event.target.name]:event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleCreate(ticket)
      setTicket({item: '', description: ''})
   }

   return(
      <>
         <h3 className="mt-3">Add An Item</h3>
         <form onSubmit={handleSubmit} className="mt-3">
            <label htmlFor="item">Item: </label>
            <input type="text" className="form-control" name="item" value={ticket.item} onChange={handleChange}/>
            <label htmlFor="description">Description: </label>
            <input type="text" className="form-control" name="description" value={ticket.description} onChange={handleChange}/>
            <input type="hidden" name="user_id" onChange={handleChange}/>
            <br/>
            <input type="submit" className="btn btn-outline-success mr-3"/>
            {props.successMessage}
            <br/>
         </form>
      </>
   )
}

export default Add
