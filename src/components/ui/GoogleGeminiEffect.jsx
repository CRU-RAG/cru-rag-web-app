/* eslint-disable react/prop-types */
import { motion } from "framer-motion"; // Import motion from framer-motion

import { cn } from "@/lib/utils"; // Assuming you have a utility function for classNames handling
import { footer, landingSecondPage } from "../../resource/content";
import { actions } from "../../lib";
import { Compare } from "./Compare";

const transition = {
  duration: 0,
  ease: "linear",
};

export const GoogleGeminiEffect = ({
  pathLengths,

  className,
  turnLandingOff
}) => {
  return (
    <div className={cn("sticky top-40", className)}>

<div>



      <p className="text-lg md:text-7xl  pb-12 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-[#EF4225] to-white">
   
             {landingSecondPage.title}
      
       
       
      <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-[40px] max-w-lg mx-auto">
       
          
         {landingSecondPage.description}
     
      </p>
      <div className='font-semibold text-[14px] mt-4 leading-[19px] text-[#FFFFFF78] l:text-[24px] l:leading-[32px] l:font-normal'>{landingSecondPage.subtitle}</div>
      </p>
      <div className="w-full h-[890px] -top-60 md:-top-40 flex items-center justify-center bg-red-transparent absolute">
        <button onClick={() => turnLandingOff()} className="font-bold bg-[#EF4225] rounded-full md:px-4 md:py-2 px-2 py-1 md:mt-[1px] mt-8 z-30 md:text-base text-white text-xs w-fit mx-auto">
        {landingSecondPage.Action}
        </button>
      </div>
      <div className="flex justify-center justify-items-center ">

      <div className="w-[80vw] h-[100vh] px-1 md:px-8 flex items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
      <div
        style={{
          transform: "rotateX(15deg) translateZ(80px)",
        }}
        className="p-1 md:p-4 border rounded-3xl dark:bg-neutral-900  bg-stone-700 border-gray-600 dark:border-neutral-800 mx-auto w-3/4 h-1/2 md:h-3/4"
      >
<Compare
       firstImage="https://assets.aceternity.com/notes-dark.png"
       secondImage="/images/god.png"
       firstImageClassName="object-cover object-left-top w-full"
       secondImageClassname="object-cover object-left-top w-full"
       className="w-full h-full rounded-[22px] md:rounded-lg "
       slideMode="hover"
       autoplay={true}
     />

 </div>
 </div>
      </div>
      <div className="h-[5vh] flex justify-center  justify-items-center">

 <p className="mb-10 text-center text-gray-300 mt-2 text-sm">{footer.landinginfo}</p>
      </div>
      <svg
        width="1440"
        height="890"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-60 md:-top-40 w-full hidden"
      >
     
        {pathLengths.map((pathLength, index) => (
          <motion.path
            key={index}
            d={actions.paths.getPathD(index)} // Assuming `getPathD` is a function that returns the correct path data for each path
            stroke={actions.paths.getStrokeColor(index)} // Assuming `getStrokeColor` is a function to return the stroke color
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            style={{ pathLength }}
            transition={transition}
          />
        ))}

        {/* Gaussian blur for the background paths */}
        {actions.paths.getBlurPaths().map((path, index) => (
          <path
            key={index}
            d={path.d}
            stroke={path.stroke}
            strokeWidth="2"
            fill="none"
            pathLength={1}
            filter="url(#blurMe)"
          />
        ))}

        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
      </svg>
      </div>
    </div>
  );
};

