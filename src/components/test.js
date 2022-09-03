const fileObject = {
  name: "main",
  folders: [],
  files: []
};

const folderObject = {
  name: folderName,
  folders: [],
  files: []
}

function newFolder(folderName) {
  location.folders.push({
    name: folderName,
    folders: [],
    files: []
  })
}

function newFile(fileName) {
  location.files.push({
    name: fileName
  })
}


  setPath(fileObj.folders[0].folders[0].files[0])
  
  navback = () => {
  
  }
  
  
  {fileObj.folders.map(({name}, i) => (
    <div key={i}>{name}</div>
  ))}
  
  {fileObj.files.map(({name}, i) => (
    <div key={i}>{name}</div>
  ))}





  import React, { useEffect, useState } from "react";
  import "./styles.css";
  
  const fileObject = {
    name: "main",
    folders: [
      {
        name: "movies",
        folders: [
          {
            name: "harry potter",
            folders: [],
            files: [{ name: "harrypotter.mkv" }]
          }
        ],
        files: []
      },
      {
        name: "pictures",
        folders: [],
        files: [{ name: "image.png" }]
      }
    ],
    files: [{ name: "picture.jpg" }, { name: "words.txt" }, { name: "movie.mp4" }]
  };
  
  export default function App() {
    const [location, setLocation] = useState(fileObject);
    const [history, setHistory] = useState([fileObject]);
  
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        {history.map((val, i) => (
          <div
            key={i}
            className="nav"
            onClick={() => {
              setLocation(val);
              setHistory([...history.slice(0, i + 1)]);
            }}
          >
            /{val.name}
          </div>
        ))}
  
        <div style={{ width: "150px" }}>
          {location.folders.map(({ name }, i) => (
            <div
              key={i}
              className="file"
              onClick={() => {
                setLocation(location.folders[i]);
                setHistory((history) => [...history, location.folders[i]]);
              }}
            >
              folder: {name}
            </div>
          ))}
          {location.files.map(({ name }, i) => (
            <div key={i} className="file">
              file: {name}
            </div>
          ))}
        </div>
      </div>
    );
  }



