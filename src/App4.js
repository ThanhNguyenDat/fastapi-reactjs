import React from 'react';
import {
    Line,
    SteppedLine,
    PolyLine,
    Circle,
    Rectangle
} from 'draw-shape-reactjs';
 
function App() {
    return (
        <div className='App'>
            <div
                style={{
                    left: '500px',
                    height: '100vh',
                    width: '50vw',
                    position: 'relative'
                }}>
                <Line
                    position='fixed'
                    from={[110, 610]}
                    to={[600, 850]}
                    color='#1DBFE7'
                />
                <SteppedLine
                    from={[0, 300]}
                    to={[900, 650]}
                    zIndex={2}
                    color='#9c27b0'
                />
                <PolyLine
                    position='fixed'
                    points={[[45, 60], [36, 120], [400, 500], [45, 60]]}
                    color='#ff8f00'
                />
                <Circle center={[800, 200]} radius={100} color='#00701a' />
                <Rectangle
                    corner={[430, 160]}
                    height={50}
                    width={100}
                    color='#FF0266'
                />
            </div>
        </div>
    );
}
 
export default App;