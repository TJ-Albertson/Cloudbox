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
        <table id="pricing-table">
          <thead>
            <tr>
              <th></th>
              <th>
                <p>Free</p>
                <Button
                  onClick={() => loginWithRedirect()}
                  className="me-3"
                  size="lg"
                  id="sign-in"
                >
                  Create Account
                </Button>
              </th>
              <th>
                <p>Basic</p>
                <p>$25 USD/month</p>
                <Button
                  onClick={() => loginWithRedirect()}
                  className="me-3"
                  size="lg"
                  id="sign-in"
                >
                  Create Account
                </Button>
              </th>
              <th>
                <p>Premium</p>
                <p>$50 USD/month</p>
                <Button
                  onClick={() => loginWithRedirect()}
                  className="me-3"
                  size="lg"
                  id="sign-in"
                >
                  Create Account
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i class="bi bi-device-hdd"></i> Secure Cloud Storage
              </td>
              <td>15 MB</td>
              <td>50 GB</td>
              <td>150 GB</td>
            </tr>
            <tr>
              <td>
                <i class="bi bi-share"></i> Unlimited Sharing
              </td>

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
              <td>
                <i class="bi bi-hand-index-thumb"></i> Fully featured interface
              </td>
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
              <td>
                <i class="bi bi-person-workspace"></i> 24/7 Customer Support
              </td>
              <td></td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
            </tr>
            <tr>
              <td>
                <i class="bi bi-award"></i> Extra member benfits
              </td>
              <td></td>
              <td></td>
              <td>
                <i className="bi bi-check-lg"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer id="home-footer">
        <div id="home-footer-item">
          <div>
            Check out my{" "}
            <a href="https://www.tjalbertson.com/" target="_blank" id="portfolio-link">
              Portfolio
            </a>{" "}
            <a href="https://github.com/TJ-Albertson" target="_blank" id="github-link">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/thomas-albertson-895443250/" target="_blank" id="linkedin-link">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
          <hr />
          <div>
            This app is not intended for commercial use. <a> Privacy </a>
            <a> Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
