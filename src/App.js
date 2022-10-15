import axios from "axios";
import React, { useEffect, useState } from "react";

import image_resource from "./images/zidane.jpg"

function App() {
  const [url, setUrl] = useState();
  const [image, setImage] = useState();
  
  const image_base = {
      selectedFile: image_resource, /* `null` is a placeholder for the file that will be uploaded. */
      sizeW: 1000,
      sizeH: 1000,
      url: url,
      api_data: null
  }

  function handleChange(event) {
    setImage(event.target.files[0]);
    setUrl(URL.createObjectURL(event.target.files[0]));    
  }

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
      <button onClick={onPredict}>Predict!</button>

      <canvas 
          id="canvas-img" 
          width={image_base.sizeW} 
          height={image_base.sizeH} 

          ref={canvas_img => canvas_img}
      />

      <img src={url} alt="" height="480px"/>
      
    </div>
  );
}

export default App;
