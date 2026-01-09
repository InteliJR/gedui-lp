// components/TrilhaSVG.tsx
type Props = {
  animate: boolean;
};

export function TrilhaSVG({ animate }: Props) {
  const pathD =
    "M100 102H316.427H547.289H778.153H1044V263.761H778.153H547.289H316.427H106V424H336.029H547.289H778.153H1044";

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
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* TRILHA LUMINOSA */}
      <path
        d={pathD}
        stroke="#91AF51"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
        className={`trilha-glow ${animate ? "animate" : ""}`}
      />

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
