import { useState } from "react"
import SequencePlayer from "./SequencePlayer"
import MyParticles from "./MyParticles"

export default function Card({ cardState }){

  const FRAME_COUNT = 10
  const FPS = 15
  const IMAGE_WIDTH = 1920
  const IMAGE_HEIGHT = 1318

  return(
    <div className="h-50 border-red-300">
      <MyParticles className="absolute z-30" />
      
      <SequencePlayer
        className={`
          absolute -rotate-90 -translate-x-12
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