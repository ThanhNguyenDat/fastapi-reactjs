import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

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
  const call_api = async ()=>{
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
      
      // img.onload = () => {
      //   setImgH(img.height);
      //   setImgW(img.width);
      // }

      img.addEventListener("load", () => {
        setImgH(img.height);
        setImgW(img.width);
      })
      // img.src = image.url;
      // Cleanup document
      return () => {
        img.removeEventListener("load");
      }
      
    }
  }
  
  useEffect(() => {
    call_api();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  useEffect(()=> {
    const c = document.getElementById("canvas-img");
    const ctx = c.getContext("2d");
    if (result.length === 0) return
    // Why call 3 times???
    console.log("ctx: ", ctx);
    
    // load img and drawing box
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      // // draw box
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      
      // Drawing box
      const boxs = result.data.result
      console.log("Result: ", boxs);
      boxs.map(box => ctx.rect(box.xmin, box.ymin, box.xmax, box.ymax))

      // ctx.rect(10, 10, 100, 100);
      ctx.stroke();
      console.log("DRAWED");
    }

    // // initial and getsize image
    img.src = image.url;

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
        width={1000}
        height={1000}
      />

    </div>
  );
}

export default App;
