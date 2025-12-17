'use client';
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function MyParticles(){

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,  // This is the key!
        zIndex: 0
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 30,
      particles: {
        color: {
          value: ["#ffb751ff", "#e72222ff", "#f949c7ff"],
        },
        move: {
          enable: true,
          speed: 1,
          direction: "bottom",
          straight: false,
          random: false,  
          outModes: {
            default: "out"
          }
        },
        number: {
          value: 50,
        },
        opacity: {
          value: {min: 0.3, max: 0.9},
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="w-full h-full relative border border-pink-500 overflow-hidden">
      <Particles
        id="tsparticles"
        options={options}
        style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      />
    </div>
  )
}