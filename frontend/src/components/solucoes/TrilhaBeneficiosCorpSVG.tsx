"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  animate: boolean;
  strokeWidth?: number;
  glowWidth?: number;
  speedSec?: number;
  lightLen?: number;
};

export function TrilhaBeneficiosCorpSVG({
  animate,
  strokeWidth = 4,
  glowWidth = 6,
  speedSec = 14,
  lightLen = 60,
}: Props) {
  const glowRef = useRef<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState(0);

  const d = "M893 86 V289 H98 V523 H893 V755 H99 V1090.5 H316.5";

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
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[1007px] h-[1201px] pointer-events-none"
      viewBox="0 86 1007 1201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="
          translate(503.5, 0)
          scale(-1.12, 1)
          translate(-503.5, 0)
        "
      >
        {/* BASE */}
        <path
          d={d}
          stroke="#91AF51"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* GLOW + SMIL */}
        <path
          ref={glowRef}
          d={d}
          stroke="#91AF51"
          strokeWidth={glowWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#corp-glow)"
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
      </g>

      <defs>
        <filter id="corp-glow">
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
