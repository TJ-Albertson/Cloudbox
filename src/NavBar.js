import React, { useState, useEffect } from 'react';
import './CSS/NavBar.css'

import { useNavigate } from "react-router-dom";


export default function NavBar(props) {

    const navigate = useNavigate()

    async function logout() {
        localStorage.removeItem("token")
        navigate("../", { replace: true });
    }

    return (
        <div>
            <ul className='List'>
                <li className='NavLeft'>
                    <a className='Link'>Email: {props.email}</a>
                </li>

                <li className='NavRight'>
                    <a className='Link' onClick={event => logout()}>Logout</a>
                </li>

                <li className='NavRight'>
                    <a className='Link'>Share Settings</a>
                </li>
            </ul>
        </div>
    )
}