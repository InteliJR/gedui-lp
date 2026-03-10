"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    src: string;
    poster: string;
    className?: string;
};


export default function SmartVideo({
    src,
    poster,
    className = "",
}: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    function toggleMute() {
        const video = videoRef.current;
        if (!video) return;
        const newMutedState = !isMuted;
        video.muted = newMutedState;
        setIsMuted(newMutedState);
    }

    return (
        <div className={`relative w-full ${className}`}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted={isMuted}
                playsInline
                loop
                preload="none"
                className="w-full h-auto rounded-xl"
            />

            {/* Botão de som */}
            <button
                onClick={toggleMute}
                className="
          absolute bottom-4 right-4
          bg-black/60 text-white text-sm
          px-3 py-1 rounded-full backdrop-blur
          hover:bg-black/80 transition
        "
            >
                {isMuted ? "🔊" : "🔈"}
            </button>
        </div>
    );
}