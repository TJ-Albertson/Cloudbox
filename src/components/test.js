const obj = {[
    "picture.jpg": {
      type:"file"
    },
    misc: {
      "words.txt": "123456",
      movies: {
        "madmax.mp4": "09823",
        "harrypotter.mkv": "75623",
      },
    },
  ]};
  
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
  const [history, setHistory] = useState([])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="file" onClick={() => setLocation(fileObject)}>
        Back to Start
      </div>
      <div style={{ width: "150px" }}>
        {location.folders.map(({ name }, i) => (
          <div
            key={i}
            className="file"
            onClick={() => {
              setHistory(history.push(location))
              console.log(history)
              setLocation(location.folders[i])
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
