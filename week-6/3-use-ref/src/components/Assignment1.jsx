

import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. 
// When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const refIn = useRef(null);  // Initializing with null is a good practice

    useEffect(() => {
        // Focus on the input field when the component mounts
        refIn.current.focus();
    }, []);

    const handleButtonClick = () => {
        // Focus on the input field when the button is clicked
        refIn.current.focus();
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter text here" 
                ref={refIn} // attaching the ref to the input field
            />
            <button onClick={handleButtonClick}>
                Focus Input
            </button>
        </div>
    );
};
