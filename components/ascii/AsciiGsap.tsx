"use client";

import { useEffect, useRef } from "react";
import styles from "./Ascii.module.scss";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
import { gsap } from "gsap";

const Ascii = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // const isMobile = window.innerWidth < 768;
        // if (isMobile) return
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        const myMesh = new THREE.Mesh();

        const pointLight1 = new THREE.PointLight(0xffffff, 1, 0, 0);
        pointLight1.position.set(100, 100, 400);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 0, 0);
        pointLight2.position.set(-500, 100, -400);
        scene.add(pointLight2);

        const material = new THREE.MeshStandardMaterial({
            flatShading: true,
            side: THREE.DoubleSide,
        });

        const stlLoader = new STLLoader();

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 2000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sizes.width, sizes.height);

        let effect: AsciiEffect;
        // let characters = " .:-+*=%@#";
        // let characters = " +:-.#@%=*";
        // let characters = " .:-+#@%=*";
        let characters = " .:-+#@%@#  #@%@#+:-.";
        // const effectSize = { amount: 0.205 };
        const effectSize = { amount: 0.175 };
        const ASCIIColor = "#777";

        function createEffect() {
            effect = new AsciiEffect(renderer, characters, {
                invert: true,
                resolution: effectSize.amount,
            });
            effect.setSize(sizes.width, sizes.height);
            effect.domElement.style.color = ASCIIColor;
            effect.domElement.style.backgroundColor = "black";
            effect.domElement.classList.add(styles.asciiBox);

            const asciiContainer = containerRef.current;
            if (asciiContainer) {
                asciiContainer.appendChild(effect.domElement);
            }
        }

        createEffect();

        const keyframes = [
            {
                rx: 1.5707953337814393,
                ry: -9.503825893487959e-7,
                rz: 1.2544634559949106,
                px: -0.18851380350171026,
                py: 0.003374259693436188,
                pz: 0.03300631548899701,
            },
            {
                px: -2.1797208198865823,
                py: 0.7456858904043902,
                pz: 1.259941607611314,
                rx: -0.10187680375576487,
                ry: -1.3965809813885177,
                rz: -0.10034508895856986,
            },
            {
                px: -1.1034436569318822,
                py: 0.7620751528401553,
                pz: 1.9652184488834998,
                rx: -0.029276658833755884,
                ry: -0.18859301653013388,
                rz: -0.005490215016934513,
            },
            // {
            //     px: 3.6492892876810172,
            //     py: 1.4758909584810571,
            //     pz: 4.25,
            //     rx: -0.2220876074269339,
            //     ry: 0.684948575340779,
            //     rz: 0.14189637418696438,
            // },
            // {
            //     px: 3.6492892876810172,
            //     py: 1.4758909584810571,
            //     pz: 4.25,
            //     rx: -0.2220876074269339,
            //     ry: 0.684948575340779,
            //     rz: 0.14189637418696438,
            // },
        ];

        const loadModel = () => {
            stlLoader.load("/stl/ethzer2.stl", (geometry) => {
                myMesh.material = material;
                myMesh.geometry = geometry;

                geometry.computeVertexNormals();
                myMesh.geometry.center();

                myMesh.rotation.x = (-90 * Math.PI) / 180;

                // myMesh.geometry.computeBoundingBox();
                // const bbox = myMesh.geometry.boundingBox;
                // myMesh.position.y = (bbox.max.z - bbox.min.z) / 5;
                myMesh.geometry.computeBoundingBox();
                const bbox = myMesh.geometry.boundingBox as THREE.Box3;
                myMesh.position.y = (bbox.max.z - bbox.min.z) / 5;


                scene.add(myMesh);

                // Set initial camera position
                const firstKey = keyframes[0];
                camera.position.set(firstKey.px, firstKey.py, firstKey.pz);
                camera.rotation.set(firstKey.rx, firstKey.ry, firstKey.rz);

                scrollAnimation();

                const clock = new THREE.Clock();
                const tick = () => {
                    const elapsedTime = clock.getElapsedTime();
                    myMesh.rotation.z = elapsedTime / 3;
                    effect.render(scene, camera);
                    requestAnimationFrame(tick);
                };

                tick();
            });
        };

        const fadeStart = window.innerHeight * 2;
        const fadeEnd = window.innerHeight * 2.5;

        // Target objects for smooth GSAP animation
        const cameraTarget = {
            x: keyframes[0].px,
            y: keyframes[0].py,
            z: keyframes[0].pz,
            rx: keyframes[0].rx,
            ry: keyframes[0].ry,
            rz: keyframes[0].rz
        };

        let isInitialLoad = true;

        const scrollAnimation = () => {
            const scrollY = window.scrollY;
            let t = scrollY / window.innerHeight;
            t = Math.min(t, keyframes.length - 1.000001);
            const data = Math.floor(t);
            const process = t - data;

            const from = keyframes[data];
            const to = keyframes[data + 1];

            // Calculate target positions
            const targetX = from.px + (to.px - from.px) * process + 0.2 + (window.innerWidth - 1536) * 0.0004;
            const targetY = from.py + (to.py - from.py) * process;
            const targetZ = from.pz + (to.pz - from.pz) * process;
            const targetRx = from.rx + (to.rx - from.rx) * process;
            const targetRy = from.ry + (to.ry - from.ry) * process;
            const targetRz = from.rz + (to.rz - from.rz) * process;

            // If it's initial load and user already scrolled, set position immediately
            if (isInitialLoad && scrollY > 50) {
                cameraTarget.x = targetX;
                cameraTarget.y = targetY;
                cameraTarget.z = targetZ;
                cameraTarget.rx = targetRx;
                cameraTarget.ry = targetRy;
                cameraTarget.rz = targetRz;
                camera.position.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
                camera.rotation.set(cameraTarget.rx, cameraTarget.ry, cameraTarget.rz);
                isInitialLoad = false;
            } else {

                // Normal smooth
                // gsap.to(cameraTarget, {
                //     x: targetX,
                //     y: targetY,
                //     z: targetZ,
                //     rx: targetRx,
                //     ry: targetRy,
                //     rz: targetRz,
                //     duration: isInitialLoad ? 0 : 0.8,
                //     ease: "power2.out",
                //     onUpdate: () => {
                //         camera.position.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
                //         camera.rotation.set(cameraTarget.rx, cameraTarget.ry, cameraTarget.rz);
                //     }
                // });


                // Cinematic Smooth
                gsap.to(cameraTarget, {
                    x: targetX,
                    y: targetY,
                    z: targetZ,
                    rx: targetRx,
                    ry: targetRy,
                    rz: targetRz,
                    duration: 2.5,
                    ease: "expo.out",
                    onUpdate: () => {
                        camera.position.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
                        camera.rotation.set(cameraTarget.rx, cameraTarget.ry, cameraTarget.rz);
                    }
                });


                isInitialLoad = false;
            }

            // Handle fade effect with GSAP
            if (scrollY <= fadeStart) {
                gsap.to(effect.domElement, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else if (scrollY > fadeStart && scrollY < fadeEnd) {
                const fadeProgress = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
                gsap.to(effect.domElement, {
                    opacity: fadeProgress,
                    duration: 0.1,
                    ease: "none"
                });
            } else {
                gsap.to(effect.domElement, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        scrollAnimation();
        loadModel();

        window.addEventListener("scroll", scrollAnimation);

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            effect.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", scrollAnimation);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div style={{ height: "300dvh", position: "relative" }}>
                <div id="ascii-container" ref={containerRef} />
            </div>
            <div className={styles.header}>
                {/* <h1>HELOO</h1> */}
            </div>
        </div>
    );
};

export default Ascii;
