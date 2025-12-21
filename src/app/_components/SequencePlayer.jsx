'use client'

// components/CardAnimation.jsx
import { useEffect, useRef, useState } from 'react';

const SequencePlayer = ({ 
  frameCount, 
  fps = 15, 
  width, 
  height, 
  folderPath,
  animationState = 'start', // start, end, forwards, backwards, loop
  onLoad,
  className
}) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]); 
  const [isLoaded, setIsLoaded] = useState(false);
  
  // We track the current frame in a Ref so the interval can read/write instantly
  const frameIndexRef = useRef(0);

  // Helper: Matches "frame_001.webp" format
  const getFramePath = (index) => {
    const paddedIndex = (index + 1).toString().padStart(4, '0');
    return `${folderPath}/frame_${paddedIndex}.webp`;
  };

  // 1. PRELOAD IMAGES
  useEffect(() => {
    let isMounted = true;
    const promises = [];

    for (let i = 0; i < frameCount; i++) {
      const p = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
           imagesRef.current[i] = img;
           resolve();
        };
        // Optional: Error handling to help debug missing files
        img.onerror = () => console.error(`Missing file: ${getFramePath(i)}`);
        
        img.src = getFramePath(i);
      });
      promises.push(p);
    }

    Promise.all(promises).then(() => {
        if (isMounted) setIsLoaded(true);
        if(onLoad) onLoad();
    });

    return () => { isMounted = false; }
  }, [frameCount, folderPath]);

  // 2. DRAW FRAME FUNCTION
  const drawFrame = (index) => {
      const canvas = canvasRef.current;
      if (!canvas || !imagesRef.current[index]) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(imagesRef.current[index], 0, 0, width, height);
  };

  // 3. ANIMATION CONTROLLER
  useEffect(() => {
    if (!isLoaded) return;

    // A. HANDLE STATE CHANGES (JUMP TO START POSITIONS)
    // If we switch to 'loop', we start at 0 (same as 'forwards')
    if (animationState === 'forwards' || animationState === 'start' || animationState === 'loop') {
        frameIndexRef.current = 0;
    } else if (animationState === 'backwards' || animationState === 'end') {
        frameIndexRef.current = frameCount - 1;
    }

    // Draw the new start position immediately
    drawFrame(frameIndexRef.current);

    // If we are in a static state, we are done. Don't start the interval.
    if (animationState === 'start' || animationState === 'end') {
        return; 
    }

    // B. START ANIMATION LOOP
    const intervalMs = 1000 / fps;
    
    const tick = () => {
      let current = frameIndexRef.current;

      // --- NEW LOOP LOGIC ---
      if (animationState === 'loop') {
        let nextFrame = current + 1;
        // Seamlessly wrap back to 0 if we exceed the count
        if (nextFrame >= frameCount) {
            nextFrame = 0;
        }
        frameIndexRef.current = nextFrame;
        drawFrame(nextFrame);
        return; // Exit, so we don't run the forwards/backwards logic below
      }
      
      // --- EXISTING FORWARDS / BACKWARDS LOGIC ---
      let target = (animationState === 'forwards') ? frameCount - 1 : 0; 

      // If we reached the target, stop updating
      if (current === target) return;

      // Move one step closer to target
      let nextFrame = current < target ? current + 1 : current - 1;

      frameIndexRef.current = nextFrame;
      drawFrame(nextFrame);
    };

    const timerId = setInterval(tick, intervalMs);

    return () => clearInterval(timerId);
  }, [isLoaded, fps, width, height, frameCount, animationState]);

  return (
    <div className={`w-auto h-full border-green-400 border-0 box-content ${className}`}>
        <canvas 
          className="border-purple-400"
          ref={canvasRef} 
          width={width} 
          height={height}
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
    </div>
  );
};

export default SequencePlayer;