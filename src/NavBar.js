import React, { useState, useEffect } from 'react';
import './CSS/NavBar.css'

export default function NavBar(props) {

    async function getProfileJSON() {
        try {
          let response = await fetch('http://localhost:5000/profile');
          let responseJSON = await response.json();
          return responseJSON;
         } catch(error) {
          console.error(error);
        }
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
                    <a className='Link'>{getProfileJSON().name}</a>
                </li>
                
            </ul>

        </div>
    )
}