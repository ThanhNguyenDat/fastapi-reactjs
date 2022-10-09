import axios from "axios";
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();
  let formData = new FormData();

  function handleChange(event) {
    let file = event.target.files[0];
    
    if (file) {
      setFile(URL.createObjectURL(event.target.files[0]));
      formData.append('file', file, file.name);
    }

    // console.log("FORM DATA: ", formData);
    // console.log(event.target.files);
    
  }

  async function onPredict(event) {
    const url = "http://127.0.0.1:8000/objectdetection";
    let result = await axios.post(url, formData);
    const data = result.then((response) => response.data)
    return data
    // console.log(formData.getAll('file'));
    // console.log(result);
  }

  var fileData = () => {
    // if (file) {
    //   return <img src={file} alt="" height="640px" />;
    // }
  };

  return (
    <div className="App">
      <h2>Hello anh Danh :D</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} alt="" height="480px"/>
      <button onClick={onPredict}>Predict!</button>
      {fileData()}
    </div>
  );
}

export default App;
