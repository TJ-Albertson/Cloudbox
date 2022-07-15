import React, { useState, useEffect } from 'react';
import './CSS/NavBar.css'


export default function NavBar(props) {

    function test() {
        return 'text'
    } 

    return (
        <div>

            <ul className='List'>
                
                <li className='NavLeft'>
                    <a className='Link'>Home</a>
                </li>

                <li className='NavRight'>
                    <a className='Link' href='http://localhost:5000/auth/auth0'>
                        {props.isLoggedIn ? 'Login' : 'Logout'}
                    </a>
                </li>

                <li className='NavRight'>
                    <a className='Link'>Settings</a>
                </li>

                <li className='NavRight'>
                    <a className='Link'>{test()}</a>
                </li>

                <li className='NavRight'>
                    <input type='checkbox' onChange={event => props.handleChange(event)} />
                </li>
                
            </ul>

        </div>
    )
}