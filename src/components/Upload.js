import { React, useState } from 'react';

import { postApi } from "../api/postApi";

export default function Upload(props) {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData();
    formData.append('file', file);
    formData.append('owner', props.email)
    formData.append('name', file.name);
    formData.append('size', file.size); //bytes

    await postApi("/upload", formData, props.token).then(props.refresh)
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