import React, { useState, useEffect } from "react";

function ParagraphGenrator() {
  const [inputNum, setnInputNum] = useState("");
  const [textToDisplay, setTextToDisplay] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(false);

  const capitalAlphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const lowercaseAlphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const onChange = (e) => {
    setnInputNum(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with", inputNum);
  
    let enteredNum = parseInt(inputNum);
    if (isNaN(enteredNum) || enteredNum <= 0) {
      console.error("Invalid number");
      return;
    }
  
    let str = [];
    for (let i = 0; i < enteredNum; i++) {
      let word = capitalAlphabets[Math.floor(Math.random() * capitalAlphabets.length)];
      console.log("Generated word:", word);  // Log each word
      
      if (word === undefined) {
        console.error("Undefined word encountered");
        continue;
      }
  
      let num = Math.floor(Math.random() * 10 + 1);
      for (let j = 0; j < num; j++) {
        const char = lowercaseAlphabets[Math.floor(Math.random() * lowercaseAlphabets.length)];
        console.log("Generated char:", char);  // Log each character
        if (char === undefined) {
          console.error("Undefined character encountered");
          continue;
        }
        word += char;
      }
  
      str.push(word);
    }
  
    console.log("Generated words array:", str);
    setTextToDisplay(str.join(" "));
    setTyping(true)
  };
  
  
  

  useEffect(() => {
    console.log("debug" , textToDisplay)
    if (typing && textToDisplay.length > 0) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < textToDisplay.length) {
          const char = textToDisplay[index]
          setDisplayedText((prev) => prev + char);
          index++;
        } else {
          clearInterval(intervalId);
          setTyping(false);
        }
      }, 50); 
      return () => clearInterval(intervalId);
    }
  }, [typing, textToDisplay]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start mt-72">
      <div className="w-[60%] h-24 bg-slate-500 rounded-md flex items-center justify-between px-7 mb-10">
        <div className="w-[70%]">
          <form action="" onSubmit={handleSubmit}>
            <input
              className="w-full py-4 indent-5 outline-none rounded-md"
              type="text"
              placeholder="Enter Number of words you want..."
              value={inputNum}
              onChange={(e) => onChange(e)}
            />
          </form>
        </div>
        <div className="bg-zinc-700 rounded-lg">
          <button
            className="py-4 px-9 text-white font-semibold text-2xl"
            onClick={handleSubmit}
          >
            Generate Text
          </button>
        </div>
      </div>
      <div className="w-full h-72 py-8 px-40 font-semibold">
        <p>{displayedText}</p>
      </div>
    </div>
  );
}

export default ParagraphGenrator;
