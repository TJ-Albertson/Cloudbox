import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap'
import axios from 'axios';
import download from 'downloadjs';

import './CSS/Box.css'

export default function Box(props) {

  //these functions let me drag, drop, and swap whats inside the
  function allowDrop(ev) {
    ev.preventDefault();
  }
    
  function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.id);
  }
    
  function drop(ev) {
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("src"));
    var srcParent = src.parentNode;
    var tgt = ev.currentTarget.firstElementChild;
    
    ev.currentTarget.replaceChild(src, tgt);
    srcParent.appendChild(tgt);
  }

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/getFiles/${props.email}`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    }
    getFilesList()
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:5000/download/${props.email}/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };
   
  return (
    <div className="Box">

    <Card>
      <Card.Header>{props.id}</Card.Header>

    

      {/*<img id={props.id} src={props.image} width="150" height="150" draggable="true" onDragStart={drag} />*/}
        <div className="files-container">
          <div id={props.id} width="150" height="150" draggable="true" onDragStart={drag}>
            <table className="files-table">
              <thead>
                <tr>
                  <th>Files</th>
                  <th>Download File</th>
                </tr>
              </thead>
              <tbody>
                {filesList.length > 0 ? (
                  filesList.map(({ _id, fileName, filePath, fileMimetype }) => (
                    <tr key={_id}>
                      <td className="file-title">{fileName}</td>
                      <td>
                        <a href="#/" onClick={() => downloadFile(_id, filePath, fileMimetype)}>Download</a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ fontWeight: '300' }}>
                      No files found. Please add some.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </Card> 
      </div>
  )
}