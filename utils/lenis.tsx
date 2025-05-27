"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function LenisScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true,
            autoResize: true,
            overscroll: true,
        }}>
            {children}
        </ReactLenis>
    );
}

