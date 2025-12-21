import { useState } from "react"
import SequencePlayer from "./SequencePlayer"
import MyParticles from "./MyParticles"

export default function Card({ cardState, particlesVisible }){

  const FRAME_COUNT = 10
  const FPS = 15
  const IMAGE_WIDTH = 1318
  const IMAGE_HEIGHT = 1920

  return(
    <div className="h-full relative border-red-300">
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
    </div>
  )
}