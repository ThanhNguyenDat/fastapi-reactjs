import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [url, setUrl] = useState();
  const [image, setImage] = useState();
  const image_resource = {
      
  }

  function handleChange(event) {
    setImage(event.target.files[0]);
    setUrl(URL.createObjectURL(event.target.files[0]));    
  }

  // useEffect(() => {
  //   // call api with dependencies

  // }, [image])

  async function onPredict(event) {
    // call api
    const formData = new FormData();

    formData.append(
      'image',
      image,
      image.name
      
    )

    const url = "http://127.0.0.1:8000/objectdetection";
    const result = await axios.post(url, formData);
    console.log("Results: ", result);
  }


  return (
    <div className="App">
      <h2>Thành nè</h2>
      <input type="file" onChange={handleChange} />

      <img src={url} alt="" height="480px"/>
      <button onClick={onPredict}>Predict!</button>
    </div>
  );
}

export default App;
