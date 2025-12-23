import { useState } from "react"
import SequencePlayer from "./SequencePlayer"
import MyParticles from "./MyParticles"

export default function Card({ cardState, particlesVisible, fireVisible }){

  const FRAME_COUNT = 15
  const FPS = 20
  const IMAGE_WIDTH = 1318
  const IMAGE_HEIGHT = 1920

  return(
    <div className={`
      h-full relative border-red-300 
      transition-transform duration-500 ease-in-out
      ${cardState == "forwards" ? "scale-[0.5] sm:scale-[0.8] md:scale-[1]" : ""}
    `}>
      <MyParticles className={`
        absolute z-30
        ${particlesVisible ? "" : "invisible"}
      `} />
      
      <SequencePlayer
        className={`
          absolute -translate-y-61/100
        `}
        frameCount={FRAME_COUNT}
        fps={FPS}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        folderPath="/frames/card"
        animationState={cardState}
        onLoad={() => {}}
      />

      <div className={`
        absolute w-[20%] h-[20%] left-[38%] top-[30%] border-pink-300
        ${fireVisible ? "" : "invisible"}
      `}>
        <SequencePlayer
          className={`
            absolute -translate-y-61/100 -rotate-90
          `}
          frameCount={32}
          fps={FPS}
          width={500}
          height={500}
          folderPath="/frames/fire"
          animationState="loop"
          onLoad={() => {}}
        />
      </div>
    </div>
  )
}