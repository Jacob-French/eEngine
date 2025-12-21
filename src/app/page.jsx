'use client'

import MyParticles from "./_components/MyParticles";
import Image from 'next/image'
import photo from './images/envelope0001.webp'
import SequencePlayer from "./_components/SequencePlayer";
import { useState } from "react";
import Envelope from "./_components/Envelope";

export default function Home() {
  
  const [animationState, setAnimationState] = useState('end')

  const FRAME_COUNT = 30; // e.g., if you have frame_000 to frame_059
  const IMAGE_WIDTH = 1510;
  const IMAGE_HEIGHT = 1080;

  function play(){
    setAnimationState((prev) => (
      prev === "end" || prev === "forwards" ? "backwards" : "forwards"
    ))
  }
  
  return (
    <div className="h-full flex flex-coll justify-center items-center">
      <div className={`
        w-100 h-100 -translate-y-12
      `}>
        <Envelope />
      </div>
    </div>
  );
}
