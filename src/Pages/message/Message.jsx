import React from 'react'
import Navbar from '../navbar/Navbar'
import EditNoteIcon from '@mui/icons-material/EditNote';
function Message() {

  return (
 <div className='d-flex'>
    <div><Navbar/></div>
    <div className='vh-100 overflow-hidden w-100' >
      <div className='col-12 col-md-6 h-100  border-end px-3 text-center' >
        <div className='d-flex w-100 justify-content-between align-items-center pt-3' >
          <h4 className='fw-bold' >{sessionStorage.username}</h4> 
          <EditNoteIcon className='fs-1' />
        </div>
        <p className='fw-bold' >Messages</p>

        <p className='w-100 mt-5 fs-6 text-center' >🚧 We're currently working on our messaging system to enhance your experience. Stay tuned for updates!</p>
        <a href="/" className='fw-bold text-primary' >Home Page</a>
      </div>
      <div></div>
    </div>
 </div>
  )
}

export default Message