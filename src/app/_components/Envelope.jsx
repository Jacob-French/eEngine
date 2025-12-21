'use client'

import { useState } from "react";
import SequencePlayer from "./SequencePlayer";
import Image from 'next/image'
import "./Envelope.css"
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Card from "./Card";

export default function Envelope(){
  
  const FRAME_COUNT = 30
  const FPS = 15
  const IMAGE_WIDTH = 1510
  const IMAGE_HEIGHT = 1080

  const TOTAL_LAYERS = 2
  const [loadedCount, setLoadedCount] = useState(0)

  const [animationState, setAnimationState] = useState("end")
  const [stage, setStage] = useState(0) //0, 1, 2, 3, 4 - 5, 6, 7 back to 0
  const [transition, setTransition] = useState(false)
  const [cardState, setCardState] = useState("start")
  const [particlesVisible, setParticlesVisible] = useState(true)

  function nextState(){
    if(!transition){
      switch(stage){
        case 0:
          setStage(1)
          transitionTime(1000)
          break
        case 1:
          setStage(2)
          setAnimationState("backwards")
          break
        case 2:
          setStage(3)
          break
        case 3:
          setStage(4)
          setCardState("forwards")
          setParticlesVisible(false)
          break
        case 4:
          setStage(5)
          setCardState("backwards")
          setTimeout(() => {setParticlesVisible(true)}, 700)
          break
        case 5:
          setStage(6)
          break
        case 6:
          setStage(7)
          setAnimationState("forwards")
          break
        case 7:
          setStage(0)
          transitionTime(1000)
      }
    }
  }

  function transitionTime(time){
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
    }, time)
  }

  function onSequenceLoad(){
    setLoadedCount(prev => prev + 1)
  }

  return(
    <div className="relative aspect-square border-emerald-500 w-full">
      <button 
        className="w-full h-full absolute border-red-300 cursor-pointer z-100" 
        onClick={nextState}  
      />

      <div className={`
        w-full h-full absolute border-0 border-red-400
        ${stage > 0 ? "card-flat card-transition-2" : "card-rotated card-transition-1"}
      `}>
        {/*FLAP*/}
        <SequencePlayer 
          className={`
            absolute
            ${stage >= 3 && stage < 7 ? "z-1" : "z-15"}
          `}
          frameCount={FRAME_COUNT}
          fps={FPS}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          folderPath="/frames/envelope/flap"
          animationState={animationState}
          onLoad={onSequenceLoad}
        />

        {/*COVER*/}
        <SequencePlayer 
          className="absolute z-10"
          frameCount={FRAME_COUNT}
          fps={FPS}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          folderPath="/frames/envelope/cover"
          animationState={animationState}
          onLoad={onSequenceLoad}
        />

        {/* OUTER CARD */}
        <div className={`
          absolute w-560/1000 h-37/100 left-20/100 top-31/100
          ${stage == 3 ? "card-move-out-animation" : ""}
          ${stage > 3 && stage < 7 ? "z-20" : ""}
          ${stage == 6 ? "card-move-in-animation" : ""}
        `}>
          {/* INNER CARD */}
          <div className={`
            absolute w-full h-full
            z-3
            ${stage >= 3 && stage < 6 ? "card-rotate-scale-out-animation" : 
              stage >=6 ? "card-rotate-scale-in-animation" : ""
            }
          `}>
            <Card cardState={cardState} particlesVisible={particlesVisible} />
          </div>
        </div>

        {/*BACKGROUND*/}
          <Image 
            className="border-sky-400 z-1"
            src="/frames/envelope/back.png"
            alt="envelope background"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes="100vw"
          />
        </div>
          {/*BACK*/}
          <Image 
            className={`
              border-sky-400 absolute  z-1
              ${stage > 0 ? "card-rotated card-transition-1" : "card-flat card-transition-2"}
            `}
            src="/frames/envelope/back.png"
            alt="envelope background"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes="100vw"
          />
    </div>
  )
}

/*

<SequencePlayer 
  frameCount={FRAME_COUNT}
  fps={15} // 15fps as requested
  width={IMAGE_WIDTH}
  height={IMAGE_HEIGHT}
  folderPath="/frames/envelope/cover" // Note the leading slash, pointing to public folder
  animationState={animationState}
  className="cursor-pointer"
  C:\_Jacob\Projects\Christmas\E Cards\e-engine1\public\frames\envelope\back.png
/>

*/