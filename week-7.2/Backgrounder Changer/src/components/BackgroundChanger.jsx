import { useState } from "react";


function BackgroundChanger() {

    const [bgColor , setBgColor] = useState("")
    
  const colorArray = [
    { colorName: "Red", colorValue: "#FF0000" },
    { colorName: "Blue", colorValue: "#0000FF" },
    { colorName: "Yellow", colorValue: "#FFFF00" },
    { colorName: "Green", colorValue: "#008000" },
    { colorName: "Black", colorValue: "#000000" },
    { colorName: "Gray", colorValue: "#808080" },
    { colorName: "DarkGreen", colorValue: "#006400" },
    { colorName: "LightGray", colorValue: "#D3D3D3" },
    { colorName: "Purple", colorValue: "#800080" },
  ];

  const changeColor = (color)=>{
    setBgColor(color);
  }

  return (
    <div className="w-full h-screen relative" style={{backgroundColor:bgColor}}>
      <div className="absolute bottom-5 mb-10 w-1/2 h-[70px] left-1/2 -translate-x-[50%]">
        <div className=" w-full h-full flex gap-4 bg-slate-300 rounded-lg px-5 items-center">
          {colorArray.map((item, index) => (
            <button className="px-4 py-3 rounded-lg" style={{backgroundColor:item.colorValue}} key={index} onClick={ ()=> changeColor(item.colorValue)} >
              {item.colorName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BackgroundChanger;
