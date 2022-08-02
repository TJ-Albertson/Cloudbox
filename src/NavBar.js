import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap"

import './CSS/NavBar.css'

export default function NavBar(props) {

    const navigate = useNavigate()

    async function logout() {
        localStorage.removeItem("token")
        navigate("../", { replace: true });
    }

    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">Brand link</Navbar.Brand>
                </Container>
            </Navbar>
   
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