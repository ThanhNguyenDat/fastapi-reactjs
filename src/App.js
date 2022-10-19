import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

function App() {
  // const [url, setUrl] = useState();
  const [image, setImage] = useState();
  const [result, setResult] = useState([]);
  const [imgW, setImgW] = useState(1000);
  const [imgH, setImgH] = useState(1000);
  
  const ref = useRef();

  useEffect(() => {

    // Cleanup
    return () => {
      image && URL.revokeObjectURL(image.url);
    }
  }, [image])

  function handleChange(event) {
    const file = event.target.files[0];

    file.url = URL.createObjectURL(file);
    
    setImage(file);
    // setImage(event.target.files[0]);
    // setUrl(URL.createObjectURL(event.target.files[0]));
  }

  async function onPredict(event) {
    console.log("Result onPredict: ", result);

    const {data} = await result.then(result => result);
    console.log(data.result);
  }

  useEffect(() => {
    // call api
    const formData = new FormData();

    if (image) {
      formData.append(
        'image',
        image,
        image.name
      )

      const url = "http://127.0.0.1:8000/objectdetection";
      const data = axios.post(url, formData); // using with await
      setResult(data);
      console.log("Called API");
      
      // JSON.stringify
      
      // Clean document
      return () => {

      }
    }
  }, [image])

  // useEffect(()=> {
  //   const c = document.getElementById("canvas-img");
  //   const ctx = c.getContext("2d");
    
  //   // Why call 3 times???
  //   console.log("ctx: ", ctx);
    
  //   // initial and getsize image
  //   const img = new Image();
  //   img.src = image;
  //   setImgH(img.height);
  //   setImgW(img.width);
    
  //   console.log("img.height: ", img.height)
  //   console.log("imgH: ", imgH);

  //   // load img and drawing box
  //   img.onload = () => {
  //     // ctx.drawImage(img, 0, 0, this.canvas_img.width, this.canvas_img.height);
  //     ctx.drawImage(img, 0, 0, imgW, imgH);
  //     // draw box
  //     ctx.beginPath();
  //     ctx.strokeStyle = 'red';
  //     ctx.lineWidth = 1;

  //     ctx.rect(10, 10, 100, 100);
      
  //     ctx.stroke();
  //     console.log("DRAWED");
  // }
  //   // img.src = image;
  // }, [image])

  return (
    <div className="App">
      <h2>Thành nè</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={onPredict}>Predict!</button>
      <p/>
      
      {image && (
      <img src={image.url} alt="" height="480px" />
      )}

      {/* <canvas 
        id="canvas-img"
        width={imgW}
        height={imgH}
        ref={ref}
      /> */}

    </div>
  );
}

export default App;
