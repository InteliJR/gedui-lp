"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  animate: boolean;
  strokeWidth?: number;
  glowWidth?: number;
  speedSec?: number;
  lightLen?: number;
};

export function TrilhaSVG({
  animate,
  strokeWidth = 14,
  glowWidth = 16,
  speedSec = 12,
  lightLen = 90,
}: Props) {
  const glowRef = useRef<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState<number>(0);

  const pathD =
    "M100 102H316.427H547.289H778.153H1044V263.761H778.153H547.289H316.427H106V424H336.029H547.289H778.153H1044";

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    setPathLen(len);

    el.style.strokeDasharray = `${lightLen} ${len}`;
    el.style.strokeDashoffset = `${len}`;
  }, [lightLen]);

  return (
    <svg
      viewBox="0 0 1150 534"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto mx-auto"
    >
      {/* TRILHA BASE */}
      <path
        d={pathD}
        stroke="#91AF51"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* TRILHA LUMINOSA */}
      <path
        ref={glowRef}
        d={pathD}
        stroke="#91AF51"
        strokeWidth={glowWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
        opacity={animate ? 1 : 0}
      >
        {animate && pathLen > 0 && (
          <animate
            attributeName="stroke-dashoffset"
            from={pathLen}
            to={-pathLen}
            dur={`${speedSec}s`}
            repeatCount="indefinite"
          />
        )}
      </path>

      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
