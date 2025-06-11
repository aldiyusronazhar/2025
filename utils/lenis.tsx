"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import 'lenis/dist/lenis.css'

export default function LenisScroll(): null {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05, 
            duration: 1.5, 
            // smoothTouch: true,
            smoothWheel: true,
            autoResize: true,
            overscroll: true,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}


