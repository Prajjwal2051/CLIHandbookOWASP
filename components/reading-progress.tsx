"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Find the scrollable main content element
        const scrollableElement = document.querySelector('main.overflow-y-auto') as HTMLElement;

        if (!scrollableElement) return;

        const updateProgress = () => {
            const scrollTop = scrollableElement.scrollTop;
            const scrollHeight = scrollableElement.scrollHeight;
            const clientHeight = scrollableElement.clientHeight;
            const docHeight = scrollHeight - clientHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setProgress(scrollProgress);
        };

        scrollableElement.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress(); // Initial calculation

        return () => scrollableElement.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
        >
            <div
                className="h-full bg-primary transition-all duration-150 ease-out shadow-sm shadow-primary/50"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
