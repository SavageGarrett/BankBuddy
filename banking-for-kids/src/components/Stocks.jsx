import React, {useState} from 'react';
import Sketch from "react-p5";


const LineChart = () => {
    let x = 50;
    let y = 50;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800,500).parent(canvasParentRef);
        
    }

    const draw = (p5) => {
        p5.background(0);

        p5.strokeWeight(2);
        p5.line(25, 25, 25, 775);

        p5.ellipse(x,y,70,70);

        x++;
    }

    return <Sketch setup={setup} draw={draw} />;
}

const Stocks = () => {
    return (
        <LineChart></LineChart>
    )
}

export default Stocks