import React from 'react'
import './All.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar navbar-default'>
        <div class="container">
      <div class="navbar-header">
        <img class="logo"src="https://www.pngitem.com/pimgs/m/78-786104_sparks-foundation-hd-png-download.png" alt="logo"/>
      </div>
        <ul class="navul">
          <li id="home"><a href="/">HOME</a></li>
          <Link to = '/customers'>
          <li id="customer"><a >CUSTOMERS</a></li>
          </Link>
          <Link to = '/transaction'>
          <li id="transaction"><a href="/transaction">TRANSACTION</a></li>
          </Link>
          <Link to = '/history'>
          <li id="history"><a href="/history">HISTORY</a></li>
          </Link>
        </ul>
    </div>
    </div>
  )
}

export default Navbar   