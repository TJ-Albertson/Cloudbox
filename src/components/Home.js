import { React, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Stack, Button, Image } from "react-bootstrap";

import "../SCSS/Home.scss";

export default function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="home">
      <Stack id="navbar" direction="horizontal" gap="3">
        <p id="logo">
          <i className="bi bi-box-seam-fill"></i> Cloudbox
        </p>
        <a id="nav-link-o" href="#overview">
          Overview
        </a>
        <a id="nav-link-f" href="#features">
          Features
        </a>
        <a id="nav-link-p" href="#pricing">
          Pricing
        </a>
        <Button
          onClick={() => loginWithRedirect()}
          className="ms-auto"
          size="lg"
          id="sign-in"
        >
          Sign in
        </Button>
        <Button href="/cloudbox" className="me-2" size="lg" id="dashboard">
          Go to Dashboard
        </Button>
      </Stack>
      <div id="overview">
        <p>
          <h1>File sharing made simple.</h1>
          <h2>
            Store and access your files and folders with an intuitive and
            familiar user interface.
          </h2>
          <Button
            onClick={() => loginWithRedirect()}
            className="me-3"
            size="lg"
            id="sign-in"
          >
            Sign in
          </Button>
          <Button href="/cloudbox" size="lg" id="dashboard">
            Go to Dashboard
          </Button>
          <h3>
            Don't have an account?{" "}
            <span id="sign-up-free" onClick={() => loginWithRedirect()}>
              Sign up for free
            </span>
          </h3>
        </p>
        <Image src="/cloudbox-laptop.svg" />
      </div>
      <hr id="hr-break" />
      <div id="features">
        <Image src="/feature-image.svg" id="feature-image" />
        <div id="feature-list">
          <p>
            <i className="bi bi-check-lg"></i> Share your files and access
            others
          </p>
          <p>
            <i className="bi bi-check-lg"></i> Familiar file navigation system
          </p>
          <p>
            <i className="bi bi-check-lg"></i> Fluid and customize-able box
            driven interface
          </p>
          <p>
            <i className="bi bi-check-lg"></i> Easily expand your dedicated
            storage
          </p>
          <p>
            <i className="bi bi-check-lg"></i> View favorite, recent, and
            trashed files
          </p>
        </div>
      </div>
      <hr id="hr-break" />
      <div id="pricing">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Free</th>
              <th>Basic</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Secure Cloud Storage</td>
              <td>15 MB</td>
              <td>50 GB</td>
              <td>150 GB</td>
            </tr>
            <tr>
              <td>Unlimited Sharing</td>

              <td>
                <i className="bi bi-check-lg"></i>
              </td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
            </tr>
            <tr>
              <td>Complete user interface experience</td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
            </tr>
            <tr>
              <td>24/7 Customer Support</td>
              <td></td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
            </tr>
            <tr>
              <td>Extra member benfits</td>
              <td></td>
              <td></td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer id="home-footer"></footer>
    </div>
  );
}
