import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';

interface TiltContextProps {
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  requestPermission: () => void;
  needsPermission: boolean;
}

const TiltContext = createContext<TiltContextProps | null>(null);

export const TiltProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  const tiltX = useSpring(rawX, { stiffness: 100, damping: 30 });
  const tiltY = useSpring(rawY, { stiffness: 100, damping: 30 });

  const [needsPermission, setNeedsPermission] = useState(false);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    let g = e.gamma || 0; 
    let b = e.beta || 0; 

    // Mobile typically has gamma between -90 and 90. 
    // We'll clamp to -45 to 45 for responsive tilt feeling without breaking wrist.
    g = Math.max(-45, Math.min(45, g));
    
    // Beta is front/back. 45 degrees is roughly holding it comfortably.
    b = Math.max(0, Math.min(90, b)); 

    const xPct = g / 45; 
    const yPct = (b - 45) / 45;

    rawX.set(xPct);
    rawY.set(yPct);
  };

  useEffect(() => {
    // Check if permission API exists (iOS 13+)
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      setNeedsPermission(true);
    } else {
      // Standard Android/PC behavior
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setNeedsPermission(false);
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } catch (error) {
        console.error("Device orientation permission error:", error);
      }
    }
  };

  return (
    <TiltContext.Provider value={{ tiltX, tiltY, requestPermission, needsPermission }}>
      {children}
    </TiltContext.Provider>
  );
};

export const useDeviceTilt = () => {
  const context = useContext(TiltContext);
  if (!context) throw new Error("useDeviceTilt must be used within TiltProvider");
  return context;
};
