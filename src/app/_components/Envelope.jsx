'use client'

import { useState } from "react";
import SequencePlayer from "./SequencePlayer";
import Image from 'next/image'
import "./Envelope.css"
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Card from "./Card";

export default function Envelope({ folder }){
  
  const FRAME_COUNT = 30
  const FPS = 20
  const IMAGE_WIDTH = 1200
  const IMAGE_HEIGHT = 1200

  const TOTAL_LAYERS = 2
  const [loadedCount, setLoadedCount] = useState(0)

  const [animationState, setAnimationState] = useState("end")
  const [stage, setStage] = useState(0) //0, 1, 2, 3, 4 - 5, 6, 7 back to 0
  const [transition, setTransition] = useState(false)
  const [cardState, setCardState] = useState("start")
  const [particlesVisible, setParticlesVisible] = useState(true)
  const [fireVisible, setFireVisible] = useState(true)

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
          setFireVisible(false)
          break
        case 4:
          setStage(5)
          setCardState("backwards")
          setTimeout(() => {setParticlesVisible(true); setFireVisible(true)}, 700)
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
        className="w-full h-full absolute border-red-300 cursor-pointer z-100 scale-[2]" 
        onClick={nextState}  
      />

      <div className={`
        w-full h-full absolute border-0 border-red-400
        ${stage > 0 ? "card-flat card-transition-2" : "card-rotated card-transition-1"}
      `}>
        {/*FLAP*/}
        <SequencePlayer 
          className={`
            absolute translate-y-[1px]
            ${stage >= 3 && stage < 7 ? "z-1" : "z-15"}
          `}
          frameCount={FRAME_COUNT}
          fps={FPS}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          folderPath={`/${folder}/frames/envelope/flap`}
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
          folderPath={`/${folder}/frames/envelope/cover`}
          animationState={animationState}
          onLoad={onSequenceLoad}
        />

        {/* OUTER CARD */}
        <div className={`
          absolute w-763/1000 h-50/100 left-12/100 top-45/100
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
            <Card cardState={cardState} particlesVisible={particlesVisible} fireVisible={fireVisible} folder={folder} />
          </div>
        </div>

        {/*BACKGROUND*/}
          <Image 
            className="border-sky-400 z-1"
            src={`/${folder}/frames/envelope/back.png`}
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
            src={`/${folder}/frames/envelope/front.png`}
            alt="envelope background"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes="100vw"
          />
    </div>
  )
}