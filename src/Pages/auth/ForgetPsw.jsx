import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';

function ForgetPsw() {
    const [email, setEmail] = useState('')
    const [emailAvailable, setEmailAvailable] = useState(false)
    const [reset, setReset] = useState(false)
    const [OTP,setOTP] = useState(false)
    const [success, setSuccess] = useState(false)
    const [final, setFinal] = useState(false)
    const [password, setPassword] = useState(false)

const SubmitEmail = async (e)=>{
     e.preventDefault()
    const result = await axios.post('/api/reset',{email: email})
    console.log(result.data);
        setEmailAvailable(true)
        setOTP(result.data)
    }
const SubmitPassword = async (e)=>{

    if (reset.password1 === reset.password2) {
        e.preventDefault()
       const res = await axios.post('/api/resetpassword', reset)
       setSuccess(res.data)
       setFinal(true)
       setOTP(false)
    }
}    
function handleChange(e){
   setReset((prev)=>{
    return {...prev, [e.target.name]: e.target.value}
   }) 
}    
  return (
        <div className='vh-100 vw-100' >
          {!OTP ?<div className='col-10 col-md-4 border rounded-2 position-absolute start-50 translate-middle-x mt-5 d-flex flex-column align-items-center pb-5' >
            <LockOutlinedIcon className='mt-4' style={{fontSize: '120px', stroke: "white", strokeWidth:'1px'}} />
            <form className='w-100 d-flex flex-column align-items-center' onSubmit={SubmitEmail}>
            <p className='fw-bold'>Trouble with logging in?</p>
            <small className='w-75 text-center mt-3' >Enter your email address, and we'll send you a code to get back into your account.</small>
            <input type='email' required onChange={(e)=>{setEmail(e.target.value)}} className='col-8 mt-3 p-2' placeholder='Email address' />
            <button type='submit' className='bg-primary text-white p-2 w-50 border border-0 rounded-2 my-3' >Send Login Code</button>
            </form>
            {emailAvailable ? <small className='text-danger' >Account Doesn't Exist</small> : null}
            <p>--------  OR  --------</p>  
            <a href="/register" type='button' className='fw-bold mt-4 mb-3'>Create New Account</a>
            <a type='button' href="/login" className='w-100 text-center p-2 position-absolute bottom-0 border border-0 border-top' >Back To Login?</a>
         </div> : null}
        {OTP? <div className='bg-light col-10 pb-5 col-md-4 border rounded-2 position-absolute start-50 translate-middle-x mt-5 d-flex flex-column align-items-center' >
            <MailOutlineIcon className='mt-4' style={{fontSize: '100px', stroke: "white", strokeWidth:'1px'}} />
            <form className='w-100 d-flex flex-column align-items-center' onSubmit={SubmitPassword}>
            <p className='fw-bold'>Reset Password</p>
            <small className='w-75 text-center mt-3' >Enter your new password with the code sent to your email.</small>
            
            <input name='password1' minLength={6} maxLength={15} type='password' required onChange={handleChange} className='col-8 mt-3 p-2' placeholder='Enter New Password' />
            <input name='password2' minLength={6} maxLength={15} type='password' required onChange={handleChange} className='col-8 mt-3 p-2' placeholder='Retype Password' />
            {reset.password1 !== reset.password2 ? <small className='text-danger' >Both passwords must be the same</small> : null}
            
            <input name='OTP' type='text' maxLength={4}  required onChange={handleChange} className='col-8 mt-3 p-2' placeholder='Enter 4 digit code' />
            <button type='submit' className='bg-primary text-white p-2 w-50 border border-0 rounded-2 my-3' >Submit</button>
            </form>
            <a type='button' href="/login" className='w-100 text-center p-2 position-absolute bottom-0 border border-0 border-top' >Back To Login?</a>
        </div> : null}
       {final ?  success ? <div className='bg-light col-10 pb-5 col-md-4 border rounded-2 position-absolute start-50 translate-middle-x mt-5 d-flex flex-column align-items-center' >
            <CheckCircleOutlineOutlinedIcon className='mt-4' style={{fontSize: '100px', stroke: "white", strokeWidth:'1px'}} />
            <p className='my-5' >Passsword has been changed successfully</p>
             
            <a type='button' href="/login" className='w-100 text-center p-2 position-absolute bottom-0 border border-0 border-top' >Back To Login?</a>
        </div> : <div className='bg-light col-10 pb-5 col-md-4 border rounded-2 position-absolute start-50 translate-middle-x mt-5 d-flex flex-column align-items-center' >
            <UnpublishedOutlinedIcon className='mt-4' style={{fontSize: '100px', stroke: "white", strokeWidth:'1px'}} />
            <p className='text-danger my-5'>Passsword has not been changed, Try again</p>
            <small className='text-danger' >OTP is incorrect, try again</small>
             
            <a type='button' href="/login" className='w-100 text-center p-2 position-absolute bottom-0 border border-0 border-top' >Back To Login?</a>
        </div> : null}

        </div>
  )
}

export default ForgetPsw