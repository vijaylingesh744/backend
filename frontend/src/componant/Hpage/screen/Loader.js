import React from 'react'
import './style/loader.css'

const Loader = () => {
  return (
    <>
    <div className='maindesk flex-column justify-content-center row-gap-5'>
      <img style={{width:'200px'}} src='assets/images/connectlogowhite.png'/>
  <div className="loading-container">
    <div className="loading-text">
      <span>C</span>
      <span>O</span>
      <span>N</span>
      <span>N</span>
      <span>E</span>
      <span>C</span>
      <span>T</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  </div>
  </div>
</>

  )
}

export default Loader
