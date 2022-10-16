import { React, useEffect } from "react";

import { Stack, Button, Image } from "react-bootstrap";

import "../SCSS/Home.scss";

export default function Home() {
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
        <Button href="/login" className="ms-auto" size="lg" id="sign-in">
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
          <Button href="/login" className="me-3" size="lg" id="sign-in">
            Sign in
          </Button>
          <Button href="/cloudbox" size="lg" id="dashboard">
            Go to Dashboard
          </Button>
          <h3>
            Don't have an account? <a href="login">Sign up for free</a>
          </h3>
        </p>
        <Image src="https://lh3.googleusercontent.com/6MmVl3TEiBeEJCFIIfzO5DIgengYGPCdhEe8M6lXA6_Eh_xsKHDL_K4CLC31dETfiCue1hFOEf30IkIqlbOStvTfYbY_G85oEtJHQqjgz6OSXco8Aw=w0-l80-sg-rj-c0xffffff" />
      </div>
      <hr id="hr-break" />
      <div id="features">
        <Image src="https://lh3.googleusercontent.com/6MmVl3TEiBeEJCFIIfzO5DIgengYGPCdhEe8M6lXA6_Eh_xsKHDL_K4CLC31dETfiCue1hFOEf30IkIqlbOStvTfYbY_G85oEtJHQqjgz6OSXco8Aw=w0-l80-sg-rj-c0xffffff" />
      </div>
      <hr id="hr-break" />
      <div id="pricing"></div>

      <footer></footer>
    </div>
  );
}
