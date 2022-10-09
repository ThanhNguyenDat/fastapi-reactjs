import React, { useState } from "react";
import axios from "axios";

function App() {
    var [file, setFile] = useState();
    // var formData = new FormData();

    function handleChange (event) {
        file = event.target.files[0];
        setFile(URL.createObjectURL(event.target.files[0]));
        
        console.log(file);
        console.log("UPLOAD SUCCESS");
    }

    async function btnPredict() {
        console.log("Start API");
        
        console.log("FILE: ", file);
        
        const formData = new FormData();
        
        // Update the formData object
        formData.append(
            "image",
            this.file,
            this.file.name
        );


        const url = "http://127.0.0.1:8000/objectdetection";
        // const result = await axios.post(url, {}, {
        //     "form-data": {
        //         "image": file
        //     }
        // });
        const result = await axios.post(url, formData);

        console.log(result);
        console.log("Call API SUCCESS")
    }

    return (
        <div id="wrapup">
            <h2>Upload Image</h2>
            {/* <h1>{file || 'upload'} </h1> */}
            <input onChange={handleChange} type="file"/>
            <button onClick={btnPredict}>Hello</button>
            <img src={file || null} alt="" height="480px"/>
            
        </div>
    )
}

export default App;