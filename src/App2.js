import axios from "axios";
import React, { Component } from "react";
// import Boundingbox from "react-bounding-box";
import {
    // Line,
    // SteppedLine,
    // PolyLine,
    // Circle,
    Rectangle
} from 'draw-shape-reactjs';

class App extends Component {
    state = {
        isFile: false,
        // Initially, no file is selected
        selectedFile: null, /* `null` is a placeholder for the file that will be uploaded. */
        url: null,
        api_data: null
    };

    
    // On file select (from the pop up)
    handleFileChange = (event) => {
        // Update the state
        this.setState(
            {   
                isFile: true,
                selectedFile: event.target.files[0], 
                url: URL.createObjectURL(event.target.files[0])
            });
        console.log("Type api_data: ", typeof this.setState.api_data);
    };

    // On file upload (click the upload button)
    handleBtnPredict = async () => {
        // Create an object of formData
        const formData = new FormData();
        
        // Update the formData object
        formData.append(
            "image",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        // console.log(this.state.selectedFile);
        

        // Request made to the backend api
        // Send formData object
        const url = "http://127.0.0.1:8000/objectdetection"
        const result = await axios.post(url, formData);
        this.data = result.data.result
        // this.setState(
        //     { 
        //         api_data: result,
        //     });
        console.log("data: ", this.data);
        this.drawBox();
        
    };

    drawBox = () => {
        // console.log("Type2 api_data: ", typeof this.setState.api_data);
        console.log("data2: ", this.data);
        if (this.data) {
            return <img alt="" src={this.state.url} height="640px">
                <Rectangle
                    corner={[this.data[0]['xmin'], this.data[0]['ymin']]}
                    height={this.data[0]['ymax']}
                    width={this.data[0]['xmax']}
                    color='#FF0266'
                />
            </img>
        }
        else {
            return <img alt="" src={this.state.url} height="640px"></img>
        }
    }

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.data) {
            return (
                <div >
                    <h1>Predict</h1>
                    {this.drawBox()}
                </div>
            )
        }

        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    {this.drawBox()}
                    {/* <img alt="" src={this.state.url} height="640px"></img> */}
                </div>
            );
        } 
        else {
            <div>
                <p> Hello </p>
            </div>
        }
        
        
    };

    render() {
        return (
            <div>
                <h1>Hello anh Danh :D</h1>
                <h3>File Upload using React!</h3>
                <div>
                    <input type="file" onChange={this.handleFileChange} />
                    <button type="submit" onClick={this.handleBtnPredict}>Predict!</button>
                    
                </div>
                
                {this.fileData()}
            </div>
        );
    }
}

export default App;
