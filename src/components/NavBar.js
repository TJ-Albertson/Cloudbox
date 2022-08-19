import { React } from 'react';
import { useNavigate } from "react-router-dom";
import { Stack, Dropdown } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react";

//not really a navbar   
export default function NavBar(props) {

    const { logout } = useAuth0();

    return (
        <Stack className="p-3 border-bottom fixed-top bg-light" direction="horizontal" gap={3}>
            <h1><i className="bi bi-box-seam-fill"></i></h1>
            <h1>CloudBox</h1>
            <Dropdown className="ms-auto">
                <Dropdown.Toggle variant="success" id="dropdown-basic">{props.email}</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick="">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.showModal(true)}>Share Settings</Dropdown.Item>
                    <Dropdown.Item onClick={() => logout({ returnTo: "http://localhost:3000/" })}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Stack>
    );
}