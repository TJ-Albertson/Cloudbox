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
                    <a className='Link'>{props.isLoggedIn ? 'Login' : 'Logout'}</a>
                </li>

                <li className='NavRight'>
                    <a className='Link'>Settings</a>
                </li>
                
            </ul>

        </div>
    )
}