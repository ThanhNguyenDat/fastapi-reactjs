import React, { useState, Component, useRef, useEffect } from "react";
import image from "./images/zidane.jpg"

class App extends Component {  
    componentDidMount() {
        const ctx = this.canvas_img.getContext("2d");

        const img = new Image();
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, this.canvas_img.width, this.canvas_img.height);
        }

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.rect(3, 3, 100, 100);
        ctx.stroke();
    }


    render() {
        return (
        <div className="App">
            <h1>Hello</h1>
            <canvas id="canvas-img" width="640" height="640" ref={canvas_img => this.canvas_img = canvas_img}>
            </canvas>
        </div>
        )
    }
}

export default App;
