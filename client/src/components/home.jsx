import React from 'react'
import MyNavbar from './Navbar'

export default function home() {
  return (
    <div className="home-container">
      <MyNavbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="home-text-section">
          Fitness is the most important part of your day
          </h1>
          <p className="home-text">
          We are here to help you 
          <br/>make the most of it!
          </p>
          <hr />
          <p className="home-text">
          Get ready to have your fitness wishes granted with <span style={{ color: '#E4BD5B'}}>GymGenie</span> .
          <br/>Your personal trainer with a touch of <span style={{ color: '#E4BD5B'}}>AI</span> and <span style={{ color: '#E4BD5B'}}> ChatGPT </span> magic!
          </p>
        </div>
      </div>
    </div>
  )
}
