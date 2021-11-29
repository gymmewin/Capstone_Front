import React, { useState, useEffect } from 'react'

const Add = (props) => {
   const [ticket, setTicket] = useState({...props.ticket})

   const handleChange = (event) => {
      setTicket({...ticket, [event.target.item]:event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleCreate(ticket)
      setTicket({item: '', description: '', date: {current_date}, completed: false, notes: ''})
   }

   return(
      <>
         <form onSubmit={handleSubmit}>
         <label htmlFor="item">Item: </label>
             <input type="text" name="item" value={ticket.item} onChange={handleChange}/>
             <label htmlFor="description">Description: </label>
             <input type="text" name="description" value={ticket.item} onChange={handleChange}/>
             <br/>
             <input type="submit" className="submit"/>
             <br/>
         </form>
      </>
   )
}

export default Add
