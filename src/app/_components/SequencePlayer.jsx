'use client'

// components/SequencePlayer.jsx
import { useEffect, useRef, useState } from 'react';

const SequencePlayer = ({ 
  frameCount, // Total number of images (e.g., 30)
  fps = 15,   // Frames per second desired
  width,      // Canvas width (should match image resolution or aspect ratio)
  height,     // Canvas height
  folderPath,  // Path inside /public (e.g., "/ecard-anim")
  className
}) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // We store the loaded Image objects here so they don't get garbage collected
  const imagesRef = useRef([]); 

  // Helper function to construct the path to a specific frame file
  // Takes an index (e.g., 5) and returns "/ecard-anim/frame_005.webp"
  const getFramePath = (index) => {
    // .padStart(3, '0') ensures index 5 becomes "005" to match filenames
    const paddedIndex = index.toString().padStart(3, '0');
    return `${folderPath}/frame_${paddedIndex}.webp`;
  };

  // --- EFFECT 1: PRELOAD IMAGES ---
  // This runs once when the component mounts.
  useEffect(() => {
    let isMounted = true;
    const promises = [];

    console.log("Starting image preload...");

    for (let i = 1; i <= frameCount; i++) {
       // Create a promise for every single image
      const p = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
           // Store loaded image in our ref array
           imagesRef.current[i] = img;
           resolve();
        };
        img.onerror = (e) => {
            console.error(`Failed to load frame ${i}`, e);
            reject(e);
        };
        // Setting src starts the download
        img.src = getFramePath(i);
      });
      promises.push(p);
    }

    // Wait for ALL images to finish downloading
    Promise.all(promises)
      .then(() => {
        if (isMounted) {
            console.log("All images preloaded. Starting animation.");
            setIsLoaded(true);
        }
      })
      .catch((err) => console.error("Preloading failed:", err));

      return () => { isMounted = false; }
  }, [frameCount, folderPath]);


  // --- EFFECT 2: ANIMATION LOOP ---
  // This only runs once 'isLoaded' becomes true.
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let currentFrameIndex = 0;

    // Calculate how many milliseconds to wait between frames
    const intervalMs = 1000 / fps; 

    const draw = () => {
       // 1. Clear the previous frame (crucial for transparency)
      ctx.clearRect(0, 0, width, height);
      
      // 2. Get the preloaded image object
      const img = imagesRef.current[currentFrameIndex];
      
      // 3. Draw it onto the canvas
      if (img) {
         // drawImage(image, x position, y position, width to draw, height to draw)
         ctx.drawImage(img, 0, 0, width, height);
      }

      // 4. Increment index, loop back to 0 if at the end
      currentFrameIndex = (currentFrameIndex + 1) % frameCount;
    };

    // Start the loop
    const timerId = setInterval(draw, intervalMs);

    // Cleanup: Stop the interval if the component is unmounted (e.g., user leaves page)
    return () => clearInterval(timerId);

  }, [isLoaded, fps, width, height, frameCount]);

  return (
    <div className={`relative w-full h-full ${className}`}>
        {!isLoaded && (
             // A simple loading indicator while prefetching
            <div style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}>
                Loading Animation...
            </div>
        )}
        {/* The actual drawing surface */}
        <canvas 
            ref={canvasRef} 
            width={width} 
            height={height}
            // CSS to make it responsive if needed, maintaining aspect ratio
            style={{ display: 'block', maxWidth: '100%', height: 'auto', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} 
        />
    </div>
  );
};

export default SequencePlayer;