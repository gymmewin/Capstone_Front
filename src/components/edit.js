import React, {useState} from 'react'

const Edit = (props) => {
   const [ticket, setTicket] = useState(props.ticket)

   const handleChange = (event) => {
      setTicket({...ticket, [event.target.name]: event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleUpdate(ticket)
   }

   return(
      <>
         <details>
            <summary className="btn btn-outline-warning btn-sm mb-1">Edit</summary>
            <form onSubmit={handleSubmit} className="mt-3">
               <label htmlFor="item">Item: </label>
               <input type="text" className="form-control" name="item" value={ticket.item} onChange={handleChange}/>
               <label htmlFor="description">Description: </label>
               <input type="text" className="form-control" name="description" value={ticket.description} onChange={handleChange}/>
               <label htmlFor="status">Status: </label>
               <input type="text" className="form-control" name="status" value={ticket.status} onChange={handleChange}/>
               <label htmlFor="notes">Notes: </label>
               <input type="text" className="form-control" name="notes" value={ticket.notes} onChange={handleChange}/>
               <br/>
               <input type="submit" className="btn btn-outline-success btn-sm mb-1"/>

            </form>
         </details>
      </>
   )
}

export default Edit
