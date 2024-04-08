import React from 'react'

function Stories(props) {
console.log(props);
  return (
   <a className='m-2' href={'/stories/'+props.id[0]}><div className="profile p-1" >
      <img className="border border-2 m-0 border-white rounded-circle" style={{width: '60px'}} src={props.profile? props.profile :"blankProfile.png"} alt="" />
    </div>
    <p className='fw-bolder text-center' >{props.username}</p>
    </a> 
  )
}

export default Stories