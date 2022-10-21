import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  // const [url, setUrl] = useState();
  const [image, setImage] = useState();
  const [result, setResult] = useState([]);
  const [imgW, setImgW] = useState(1000);
  const [imgH, setImgH] = useState(1000);
  const img = new Image();

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

    // const {data} = await result.then(result => result);
    // console.log(data.result);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const call_api = async (image)=>{
    // call api
    const formData = new FormData();

    if (image) {
      formData.append(
        'image',
        image,
        image.name
      )
      const url = "http://127.0.0.1:8000/objectdetection";
      const data = await axios.post(url, formData); // using with await
      setResult(data);
      console.log("Called API");
      
    }
  }
  
  useEffect(() => {
    call_api(image);
    const loadImage = () => {
      setImgH(img.height);
      setImgW(img.width);
    }

    img.addEventListener("load", loadImage)
    // img.src = image.url;
    
    // Cleanup event
    return () => {
      img.removeEventListener("load", loadImage);
    }
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  useEffect(()=> {
    const c = document.getElementById("canvas-img");
    const ctx = c.getContext("2d");
    if (result.length === 0) return
    // Why call 3 times???
    console.log("ctx: ", ctx);
    
    // load img and drawing box
    const onLoad = () => {
      var scale = Math.min(c.width / imgW, c.height / imgH);
      var x = (c.width / 2) - (imgW / 2) * scale;
      var y = (c.height / 2) - (imgH / 2) * scale;
      ctx.drawImage(img, x, y, imgW * scale, imgH * scale);

      // // draw box
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      
      // Drawing box
      const boxs = result.data.result
      console.log("Result: ", boxs);
      boxs.map(box => ctx.rect(x + box.xmin * scale, y + box.ymin * scale, x + (box.xmax - box.xmin) * scale, y + (box.ymax - box.ymin) * scale))

      ctx.stroke();
      console.log("DRAWED");
    }

    img.addEventListener("load", onLoad)
    
    // // initial and getsize image
    img.src = image.url;
    
    // Cleanup event and fill canvas
    return () => {
      img.removeEventListener("load", onLoad)
      ctx.beginPath();
      ctx.rect(0, 0, c.width, c.height);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <div className="App">
      <h2>Thành nè</h2>
      <input type="file" onChange={handleChange} />
      <p/>
      <button onClick={onPredict}>Predict Vô Console coi result thôi nhé các anh =]]]!</button>
      <p/>
{/*       
      {image && (
      <img src={image.url} alt="" height="480px" />
      )} */}

      <canvas 
        id="canvas-img"
        style={{width:"100vw", height:"80vh"}}
      />

    </div>
  );
}

export default App;
