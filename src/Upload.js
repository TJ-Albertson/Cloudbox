import React, {useState} from 'react';
import axios from 'axios';

export default function Upload(props) {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()

    const url = 'http://localhost:5000/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('ownerEmail', props.email)
    formData.append('fileName', file.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    
    axios.post(url, formData, config)
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}