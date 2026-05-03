import React, { forwardRef, useRef, useImperativeHandle, useContext, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

// This is a patched version of drei's ScrollHtml that adds safety checks for React 19
export const SafeScrollHtml = forwardRef(({ children, style, ...props }, ref) => {
  const state = useScroll();
  const group = useRef(null);
  useImperativeHandle(ref, () => group.current, []);
  
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  
  // Create a portal root attached to the scroll control's fixed element overlay
  const root = useMemo(() => createRoot(state.fixed), [state.fixed]);

  useFrame(() => {
    // 🚨 React 19 Async Mounting Fix: Check group.current before updating style!
    if (!group.current) return;
    
    if (state.delta > state.eps) {
      group.current.style.transform = `translate3d(${
        state.horizontal ? -width * (state.pages - 1) * state.offset : 0
      }px,${
        state.horizontal ? 0 : height * (state.pages - 1) * -state.offset
      }px,0)`;
    }
  });

  useEffect(() => {
    root.render(
      <div
        ref={group}
        style={{
          ...style,
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
        {...props}
      >
        {children}
      </div>
    );
    
    return () => {
      // Clean up the portal on unmount!
      setTimeout(() => root.unmount(), 0);
    };
  }, [root, children, style, props]);

  return null;
});
