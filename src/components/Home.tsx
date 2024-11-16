import React from "react";
import NavHome from "./NavHome"

export default function Home(turnLandingOff:()=>void) {
  const ref = React.useRef(null);
  
  return (
    <div
      className=" bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative  overflow-clip"
      ref={ref}
    >
     
     <NavHome turnLandingOff={turnLandingOff} />
    
    </div>
  );
}
