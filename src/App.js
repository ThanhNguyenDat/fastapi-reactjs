import axios from "axios";
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();
  
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  async function onPredict(e) {
    
    const url = "http://127.0.0.1:8000/objectdetection"
    let result = await axios.post(url, file);


    console.log(e.target.files);
    console.log(result);
  }

  var fileData = () => {
    if (file) {
      return (
        <img src={file} alt="" height="640px"/>
      )
    }
  }

  return (
    <div className="App">
      <h2>Hello anh Danh :D</h2>
      <input type="file" onChange={handleChange} />      
      {/* <img src={file} alt="" height="480px"/> */}
      <button onClick={onPredict}>Predict!</button>
      {fileData()}
    </div>
  )
}

export default App;
