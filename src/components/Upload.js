import { React, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

import { postApi } from "../api/postApi";

export default function Upload(props) {

  const [file, setFile] = useState()
  const { getAccessTokenSilently } = useAuth0();

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()

    const url = 'http://localhost:5000/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('owner', props.email)
    formData.append('name', file.name);
    formData.append('size', file.size); //bytes


    const token = await getAccessTokenSilently({ audience: 'http://localhost:5000'});


    postApi(formData, "/upload", token)
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}