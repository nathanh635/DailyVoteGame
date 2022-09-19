
import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import './navbar.css';
import { Link } from 'react-router-dom';

import { ReactNode } from 'react';


export default function NavBar() {
  
    return (
      <div  className="navbar">
        
      <ul>
        <li className="nav-item">
        <Link to="/signup">
                    Signup
                  </Link>
        </li>
        <li className="nav-item">
        <Link to="/signup">
                    Signup
                  </Link>
        </li>
        <li className="nav-item">
        <Link to="/signup">
                    Signup
                  </Link>
        </li>
        <li className="nav-item">
        <Link to="/signup">
                    Signup
                  </Link>
        </li>
      </ul>
      </div>
    );
  }
