

import React, { useState, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered.

export function Assignment2() {
    const [fr, setForceRender] = useState(0);  // State to force re-render
    const renderCount = useRef(1);  // useRef to track the render count, initialized at 1

    const handleReRender = () => {
        // Increment the render count
        renderCount.current = renderCount.current + 1;

        // Force the component to re-render by updating state
        setForceRender(Math.random());
    };

    return (
        <div>
            <p>This component has rendered {renderCount.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
}
