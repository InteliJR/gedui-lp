// hooks/useIntersection.ts
import { useEffect, useState, RefObject } from "react";

export function useIntersection(
  ref: RefObject<Element>,
  threshold = 0.4
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}
