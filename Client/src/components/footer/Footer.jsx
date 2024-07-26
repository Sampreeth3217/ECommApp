import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className="text-center text-lg-start ">
      <div className="text-center text-light p-3" style={{backgroundColor: "var(--dark-cyan)"}}>
        © 2024 Copyright:
        <a className="text-reset text-decoration-none fw-bold" href="#"> SimpleE.com</a>
      </div>
    </footer>
  )
}

export default Footer