import React, { Component } from "react";
import image_resource from "./images/zidane.jpg"
import axios from "axios";

class App extends Component { 
    state = {
        // Initially, no file is selected
        selectedFile: image_resource, /* `null` is a placeholder for the file that will be uploaded. */
        sizeW: 1000,
        sizeH: 1000,
        url: null,
        api_data: null
    };


    componentDidMount() {
        const ctx = this.canvas_img.getContext("2d");
        
        // load image into canvas-img
        const img = new Image();
        img.src = this.state.selectedFile;
        this.setState({
            sizeH: img.height,
            sizeW: img.width
        })

        // call api
        var x = 743;
        var y = 45;
        var w = 743 + 1149;
        var h = 45 + 720;

        img.onload = () => {
            // ctx.drawImage(img, 0, 0, this.canvas_img.width, this.canvas_img.height);
            ctx.drawImage(img, 0, 0, this.state.sizeW, this.state.sizeH);
            // draw box
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            // ctx.rect(x, y, w, h);
            
            ctx.stroke();
        }   
         
    }


    render() {
        return (
        <div className="App">
            <h1>Hello</h1>
            <canvas 
                id="canvas-img" 
                width={this.state.sizeW} 
                height={this.state.sizeH} 
                ref={canvas_img => this.canvas_img = canvas_img}
            />
        </div>

        )
    }
}

export default App;
