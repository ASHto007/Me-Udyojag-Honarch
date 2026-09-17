import { useEffect, useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { motion, useSpring } from 'motion/react';
import './TiltedCard.css';

export interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  // This content-first adaptation intentionally has no tooltip or mobile warning.
  showMobileWarning?: false;
  showTooltip?: false;
}

const spring = { damping: 30, stiffness: 120, mass: 1.2 };
const motionQuery = '(min-width: 640px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Content-first adaptation of React Bits TiltedCard's pointer-to-spring interaction.
 * https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/TiltedCard
 */
export function TiltedCard({
  children,
  className = '',
  rotateAmplitude = 5,
  scaleOnHover = 1.025,
}: TiltedCardProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);

  useEffect(() => {
    const query = window.matchMedia(motionQuery);
    const resetImmediately = () => {
      enabled.current = query.matches;
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      rotateX.jump(0);
      rotateY.jump(0);
      scale.jump(1);
    };
    resetImmediately();
    query.addEventListener('change', resetImmediately);
    return () => {
      query.removeEventListener('change', resetImmediately);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      enabled.current = false;
    };
  }, [rotateX, rotateY, scale]);

  const reset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled.current || event.pointerType !== 'mouse') return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (!enabled.current || !wrapper.current) return;
      // Measure the stationary grid wrapper, never the transformed card.
      const rect = wrapper.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      const x = clamp((pointer.current.x - rect.left) / rect.width * 2 - 1);
      const y = clamp((pointer.current.y - rect.top) / rect.height * 2 - 1);
      rotateX.set(-y * rotateAmplitude);
      rotateY.set(x * rotateAmplitude);
      scale.set(scaleOnHover);
    });
  };

  return (
    <div
      ref={wrapper}
      className="tilted-card"
      onPointerEnter={updatePointer}
      onPointerMove={updatePointer}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onFocusCapture={reset}
    >
      <motion.article
        className={`tilted-card__inner ${className}`.trim()}
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.article>
    </div>
  );
}
