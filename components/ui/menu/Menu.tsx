"use client";

import "./menu.css";
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from 'next/navigation';


const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/", label: "Private Acces" },
    // { path: "/works", label: "Works" },
    // { path: "/playground", label: "Playground" },
    // { path: "/about", label: "About" },
    // { path: "/contact", label: "Contact" },
];

export default function Menu() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef<GSAPTimeline | null>(null);
    const logoRef = useRef(null);
    const infoRef = useRef(null);





    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 97 });
        tl.current = gsap.timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
            })
            .to(".menu-link-item-holder", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut",
                delay: -0.75,
            })
    }, { scope: container }
    );

    useEffect(() => {
        if (!tl.current) return;

        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
    }).format(time);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);



    const [glow, setGlow] = useState(false);
    const pathname = usePathname();


    useEffect(() => {
        const interval = setInterval(() => {
            setGlow(true);
            setTimeout(() => setGlow(false), 4000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="menu-container" ref={container}>
            <div className="menu-bar">
            </div>

            <div className="menu-button">
                <div className="menu-open" onClick={toggleMenu}>
                    <span className="roll_text_hover">
                        <span className="text-original">+ Menu</span>
                        <span className="text-hover">+ Menu</span>
                    </span>
                </div>
            </div>
            <div className="menu-overlay">
                <div className="menu-overlay-bar">
                    <div className="menu-logo">
                        {/* <Link href="/">ETHZ_</Link> */}
                    </div>
                    <div className="menu-close" onClick={toggleMenu}>
                        <span className="roll_text_hover">
                            <span className="text-original">- Close</span>
                            <span className="text-hover">- Close</span>
                        </span>
                    </div>
                </div>
                <div className="menu-close-icon" onClick={toggleMenu}>
                    <p>&#x2715;</p>
                </div>
                <div className="menu-copy">
                    <div className="menu-links">
                        {menuLinks.map((link, index) => {
                            const isActive = pathname === link.path;

                            return (
                                <div className="menu-link-item" key={index}>
                                    <div className="menu-link-item-holder" onClick={toggleMenu}>
                                        <Link href={link.path} className="menu-link">
                                            <span className="menu-link-number">{`/0${index + 1}`}</span>
                                            <span className="roll_text_hover">
                                                <span className="text-original">{link.label}</span>
                                                <span className="text-hover">{link.label}</span>
                                            </span>
                                            <span className={`menu-link-dot ${isActive ? 'active' : ''}`} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                    <div className="menu-info">
                        <div className="menu-info-col">
                            <a href="#">X</a>
                            <a href="#">Instagram</a>
                            <a href="#">LinkedIn</a>
                        </div>
                        <div className="menu-info-col">
                            <p>aldiyusronazhar@gmail.com</p>
                            <p>+62 859 2532 7256</p>
                        </div>
                    </div>
                </div>
                <div className="menu-preview">
                    <p>View Showreel</p>
                </div>
            </div>
        </div>
    );
}



