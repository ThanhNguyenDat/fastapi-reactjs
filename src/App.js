import React, { Component } from "react";
import image_resource from "./images/zidane.jpg"
import axios from "axios";

class App extends Component { 
    state = {
        // Initially, no file is selected
        selectedFile: image_resource, /* `null` is a placeholder for the file that will be uploaded. */
        url: null,
        api_data: null
    };


    async componentDidMount() {
        const ctx = this.canvas_img.getContext("2d");
        const  img_non = document.getElementById("img_none")
        console.log(img_non.naturalWidth);
        
        // load image into canvas-img
        const img = new Image();
        img.src = this.state.selectedFile;
        console.log(img);
        // call api
        var x = 743;
        var y = 45;
        var w = 743 + 1149;
        var h = 45 + 720;
        img.onload = () => {
            // ctx.drawImage(img, 0, 0, this.canvas_img.width, this.canvas_img.height);
            ctx.drawImage(img, 0, 0, img_non.naturalWidth, img_non.naturalHeight);

            // draw box
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            ctx.rect(743, 45, 743 + 1149, 45 + 720);
            ctx.stroke();
        }        
    }


    render() {
        return (
        <div className="App">
            <h1>Hello</h1>
            <canvas id="canvas-img" width={this.state.selectedFile.width} ref={canvas_img => this.canvas_img = canvas_img}>
            </canvas>


            <div className="NoneDisplay" hidden>
                <img src={this.state.selectedFile} alt="" id="img_none"></img>
            </div>
        </div>

        )
    }
}

export default App;
