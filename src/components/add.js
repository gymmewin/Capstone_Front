import React, { useState } from 'react'

const Add = (props) => {
   const [ticket, setTicket] = useState({...props.ticket})

   const handleChange = (event) => {
      setTicket({...ticket, [event.target.name]:event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleCreate(ticket)
      setTicket({item: '', description: ''})
   }
   // , date: 'current_date', completed: false, notes: ''

   return(
      <>
         <form onSubmit={handleSubmit} className="mt-3">
            <label htmlFor="item">Item: </label>
            <input type="text" className="form-control" name="item" value={ticket.item} onChange={handleChange}/>
            <label htmlFor="description">Description: </label>
            <input type="text" className="form-control" name="description" value={ticket.description} onChange={handleChange}/>
            <br/>
            <input type="submit" className="btn btn-success"/>
            <br/>
         </form>
      </>
   )
}

export default Add
