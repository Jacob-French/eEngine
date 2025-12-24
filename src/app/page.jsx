'use client'

import MyParticles from "./_components/MyParticles";
import Image from 'next/image'
import photo from './images/envelope0001.webp'
import SequencePlayer from "./_components/SequencePlayer";
import { useState } from "react";
import Envelope from "./_components/Envelope";

export default function Home() {
  
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
