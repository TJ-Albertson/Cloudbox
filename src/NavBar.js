import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap"

import './CSS/NavBar.css'
import './free.svg'

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
                    <Button variant="primary" size="lg" disabled>{props.email}</Button>{' '}
                </li>

                <li className='NavRight'>
                    <Button variant="primary" size="lg" onClick={() => logout()}>Logout</Button>
                </li>

                <li className='NavRight'>
                    <Button variant="primary" size="lg" onClick={() => props.showModal(true)}>Share Settings</Button>
                </li>
            </ul>
        </div>
    )
}