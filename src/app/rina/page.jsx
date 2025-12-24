'use client'

import Image from 'next/image'
import { useState } from "react";
import Envelope from "../_components/Envelope";

export default function Home() {
  
  return (
    <div className="h-full flex flex-coll justify-center items-center">
      <div className={`
        w-100 h-100 -translate-y-12
      `}>
        <Envelope folder="rina" />
      </div>
    </div>
  );
}