import React, { useState, useEffect } from 'react';
import './CSS/NavBar.css'

export default function NavBar(props) {

    return (
        <div>
            
            <ul className='List'>
                
                <li className='NavLeft'>
                    <a className='Link'>Home</a>
                </li>

                <li className='NavRight'>
                    <a className='Link' href='http://localhost:5000/profile'>
                        {props.isLoggedIn ? 'Login' : 'Logout'}
                    </a>
                </li>

                <li className='NavRight'>
                    <a className='Link'>Email {props.email}</a>
                </li>

                <li className='NavRight'>
                    <input type='checkbox' onChange={event => props.addBox(event)} />
                </li>

                <li className='NavRight'>
                    <input type='checkbox' onChange={event => props.removeBox(event)} />
                </li>
                
            </ul>

        </div>
    )
}