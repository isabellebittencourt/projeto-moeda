import React from 'react'
import {Link} from "react-router-dom";
import './menu.css';

export default function Menu() {
  return (
    <div className='top'>
        <div className="topLeft">
                <div className='topTitle'>Conversor de Moeda</div>
        </div>
        <div className="topRight">
                <ul className='topList'>
                  <Link to={'/'} className="Link">
                            <li className='topListItem'>LISTAR</li>
                  </Link>
                  <Link to={'/register'} className="Link">
                            <li className='topListItem'>CADASTRAR</li>
                  </Link>
                </ul>
        </div>
    </div>
  )
}
