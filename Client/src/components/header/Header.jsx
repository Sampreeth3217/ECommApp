import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { HiMiniHome } from "react-icons/hi2";
import { GiArchiveRegister } from "react-icons/gi";
import { BiSolidLogInCircle } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";

const Header = () => {
  return (
    <div className='d-flex justify-content-around header'>
      <h1 className="d-flex align-items-center text-warning">
        <FaShoppingBag className="text-white mx-auto me-2" />My Shop
      </h1>
      <ul className='nav fs-5 p-3'>
        <li className='nav-item'>
          <Link to="" className="nav-link text-white d-flex align-items-center">
            <HiMiniHome className='fs-3 text-warning me-2'/>Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="register" className="nav-link text-white d-flex align-items-center">
            <GiArchiveRegister className='fs-3 text-warning me-2'/>Register
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="login" className="nav-link text-white d-flex align-items-center">
            <BiSolidLogInCircle className='fs-3 text-warning me-2'/>Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="about" className="nav-link text-white d-flex align-items-center">
            <IoPeopleSharp className='fs-3 text-warning me-2'/>About Us
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Header;
