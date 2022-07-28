import React, { useState, useEffect } from 'react';
import './CSS/Box.css'
import axios from 'axios';
import download from 'downloadjs';

export default function Box(props) {

    //these functions let me drag, drop, and swap whats inside them
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
            const { data } = await axios.get(`http://localhost:5000/getAllFiles`);
            setErrorMsg('');
            setFilesList(data);
          } catch (error) {
            error.response && setErrorMsg(error.response.data);
          }
        };
    
        getFilesList();
    }, []);

    const downloadFile = async (id, path, mimetype) => {
      try {
        const result = await axios.get(`http://localhost:5000/download/${id}`, {
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
      <div className="Box" onDrop={drop} onDragOver={allowDrop}>
        {/*<img id={props.id} src={props.image} width="150" height="150" draggable="true" onDragStart={drag} />*/}
        <div className="files-container">
          <div id={props.id} width="150" height="150" draggable="true" onDragStart={drag}>
            <table className="files-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Download File</th>
                  <th>ID: {props.id}</th>
                </tr>
              </thead>
              <tbody>
                {filesList.length > 0 ? (
                  filesList.map(({ _id, title, description, file_path, file_mimetype }) => (
                    <tr key={_id}>
                      <td className="file-title">{title}</td>
                      <td className="file-description">{description}</td>
                      <td>
                        <a href="#/" onClick={() => downloadFile(_id, file_path, file_mimetype)}>Download</a>
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
      </div>
    )
}