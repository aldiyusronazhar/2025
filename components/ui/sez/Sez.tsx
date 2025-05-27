'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Sez.module.scss';

interface SezItemConfig {
    shuffle?: boolean;
    loop?: boolean;
    interval?: number;
    duration?: number;
}

interface SezProps {
    sez1: string;
    sez2: string;
    sez3: string;
    config?: {
        sez1?: SezItemConfig;
        sez2?: SezItemConfig;
        sez3?: SezItemConfig;
    };
}

export default function Sez({
    sez1,
    sez2,
    sez3,
    config = {},
}: SezProps) {
    // const [isMobile, setIsMobile] = useState(false);
    //
    // useEffect(() => {
    //     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    //     checkMobile();
    //     window.addEventListener('resize', checkMobile);
    //     return () => {
    //         window.removeEventListener('resize', checkMobile);
    //     };
    // }, []);

    const textRefs = {
        sez1: useRef<HTMLSpanElement | null>(null),
        sez2: useRef<HTMLSpanElement | null>(null),
        sez3: useRef<HTMLSpanElement | null>(null),
    };

    const shuffleInstances = {
        sez1: useRef<ShuffleText | null>(null),
        sez2: useRef<ShuffleText | null>(null),
        sez3: useRef<ShuffleText | null>(null),
    };

    const timers = {
        sez1: useRef<NodeJS.Timeout | null>(null),
        sez2: useRef<NodeJS.Timeout | null>(null),
        sez3: useRef<NodeJS.Timeout | null>(null),
    };

    const doShuffle = (key: keyof typeof shuffleInstances) => {
        shuffleInstances[key].current?.start();
    };

    const startInterval = (key: keyof typeof timers, interval: number) => {
        timers[key].current = setInterval(() => {
            doShuffle(key);
        }, interval);
    };

    const stopInterval = (key: keyof typeof timers) => {
        if (timers[key].current) {
            clearInterval(timers[key].current!);
            timers[key].current = null;
        }
    };

    useEffect(() => {
        (['sez1', 'sez2', 'sez3'] as const).forEach((key) => {
            const el = textRefs[key].current;
            const itemCfg = config[key] || {};
            const {
                shuffle = false,
                loop = false,
                interval = 2000,
                duration = 600,
            } = itemCfg;

            if (shuffle && el) {
                shuffleInstances[key].current = new ShuffleText(el, duration);
                doShuffle(key);
                if (loop) startInterval(key, interval);
            }
        });

        return () => {
            (['sez1', 'sez2', 'sez3'] as const).forEach((key) => stopInterval(key));
        };
    }, [config]);
    // useEffect(() => {
    //     (['sez1', 'sez2', 'sez3'] as const).forEach((key) => {
    //         const el = textRefs[key].current;
    //         const itemCfg = config[key] || {};
    //         const {
    //             shuffle = false,
    //             loop = false,
    //             interval = 2000,
    //             duration = 600,
    //         } = itemCfg;
    //
    //         stopInterval(key); // Hentikan timer dulu
    //
    //         if (!isMobile && shuffle && el) {
    //             // Inisialisasi dan shuffle hanya kalau desktop
    //             shuffleInstances[key].current = new ShuffleText(el, duration);
    //             doShuffle(key);
    //             if (loop) startInterval(key, interval);
    //         } else {
    //             // Kalau mobile, pastikan teks asli langsung ditampilkan tanpa shuffle
    //             if (el) {
    //                 // Reset instance ShuffleText supaya gak ada efek shuffle
    //                 shuffleInstances[key].current?.stop();
    //                 shuffleInstances[key].current = null;
    //                 el.textContent = key === 'sez1' ? sez1 : key === 'sez2' ? sez2 : sez3;
    //             }
    //         }
    //     });
    //
    //     return () => {
    //         (['sez1', 'sez2', 'sez3'] as const).forEach((key) => stopInterval(key));
    //     };
    // }, [config, isMobile, sez1, sez2, sez3]);


    return (
        <div className={styles.wrapper}>
            <div className={styles.lineContainer}>
                <div className={styles.line}>
                    <div className={styles.tick}></div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.sez1}>
                    <span className={styles.dot}></span>
                    <span ref={textRefs.sez1}>{sez1}</span>
                </div>
                <div className={styles.sez2}>
                    <span className={styles.dot}></span>
                    <span ref={textRefs.sez2}>{sez2}</span>
                </div>
                <div className={styles.sez3}>
                    <span className={styles.dot}></span>
                    <span ref={textRefs.sez3}>{sez3}</span>
                </div>
            </div>
        </div>
    );
}


// ShuffleText Class
class ShuffleText {
    sourceRandomCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    emptyCharacter = '_';
    duration = 600;
    _isRunning = false;
    _originalStr = '';
    _originalLength = 0;
    _timeCurrent = 0;
    _timeStart = 0;
    _randomIndex: number[] = [];
    _element: HTMLElement | null = null;
    _requestAnimationFrameId = 0;

    constructor(element: HTMLElement, duration = 600) {
        this._element = element;
        this.duration = duration;
        this.setText(element.textContent ?? '');
    }

    setText(text: string) {
        this._originalStr = text;
        this._originalLength = text.length;
    }

    get isRunning() {
        return this._isRunning;
    }

    // start() {
    //     this.stop();
    //     this._randomIndex = [];
    //     let str = '';
    //     for (let i = 0; i < this._originalLength; i++) {
    //         const rate = i / this._originalLength;
    //         this._randomIndex[i] = Math.random() * (1 - rate) + rate;
    //         str += this.emptyCharacter;
    //     }
    //     this._timeStart = Date.now();
    //     this._isRunning = true;
    //     this._requestAnimationFrameId = requestAnimationFrame(() => this._onInterval());
    //     if (this._element) this._element.textContent = str;
    // }
    start() {
        this.stop();
        this._randomIndex = [];
        let str = '';
        for (let i = 0; i < this._originalLength; i++) {
            const rate = i / this._originalLength;
            this._randomIndex[i] = Math.random() * (1 - rate) + rate;
            str += this.sourceRandomCharacter.charAt(
                Math.floor(Math.random() * this.sourceRandomCharacter.length)
            );
        }
        this._timeStart = Date.now();
        this._isRunning = true;
        this._requestAnimationFrameId = requestAnimationFrame(() => this._onInterval());
        if (this._element) this._element.textContent = str;
    }


    stop() {
        this._isRunning = false;
        cancelAnimationFrame(this._requestAnimationFrameId);
    }

    // _onInterval() {
    //     this._timeCurrent = Date.now() - this._timeStart;
    //     const percent = this._timeCurrent / this.duration;
    //     let str = '';
    //
    //     for (let i = 0; i < this._originalLength; i++) {
    //         if (percent >= this._randomIndex[i]) {
    //             str += this._originalStr.charAt(i);
    //         } else if (percent < this._randomIndex[i] / 3) {
    //             str += this.emptyCharacter;
    //         } else {
    //             str += this.sourceRandomCharacter.charAt(
    //                 Math.floor(Math.random() * this.sourceRandomCharacter.length)
    //             );
    //         }
    //     }
    //
    //     if (percent > 1) {
    //         str = this._originalStr;
    //         this._isRunning = false;
    //     }
    //
    //     if (this._element) this._element.textContent = str;
    //
    //     if (this._isRunning) {
    //         this._requestAnimationFrameId = requestAnimationFrame(() => this._onInterval());
    //     }
    // }

    _onInterval() {
        this._timeCurrent = Date.now() - this._timeStart;
        const percent = this._timeCurrent / this.duration;
        let str = '';

        for (let i = 0; i < this._originalLength; i++) {
            if (percent >= this._randomIndex[i]) {
                str += this._originalStr.charAt(i);
            } else {
                str += this.sourceRandomCharacter.charAt(
                    Math.floor(Math.random() * this.sourceRandomCharacter.length)
                );
            }
        }

        if (percent > 1) {
            str = this._originalStr;
            this._isRunning = false;
        }

        if (this._element) this._element.textContent = str;

        if (this._isRunning) {
            this._requestAnimationFrameId = requestAnimationFrame(() => this._onInterval());
        }
    }

}


