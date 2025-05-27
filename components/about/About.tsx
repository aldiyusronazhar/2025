'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.scss';
import TagHover from '@/components/ui/taghover/TagHover';


gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const introRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!introRef.current) return;

        const elements = introRef.current.querySelectorAll('p');

        gsap.fromTo(
            elements,
            {
                opacity: 0,
                filter: 'blur(10px)',
                y: 30,
            },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: introRef.current,
                    start: 'top 80%',
                    end: 'bottom 60%',
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);



    return (
        <section className={styles.about}>
            <TagHover
                targetClass={styles.about__introduction}
                text="About Me__"
                iconBg="#444444"
            />
            <TagHover
                targetClass={styles.about__media}
                text="Aldi Yusron__"
                iconBg="#ff6700"
            />
            <div className={styles.about__introduction} ref={introRef}>

                <p data-gl-text>
                    Junior frontend developer and UI/UX Enthusast, <br />
                    crafting smooth, intuitive user experiences <br />
                    focused on clean, elegant, functional design.
                </p>


                {/* <p data-gl-text> */}
                {/*     Experience in web development focused on<br /> */}
                {/*     projects that blend clean design with<br /> */}
                {/*     practical function across websites and apps,<br /> */}
                {/*     delivering solutions that help users grow. */}
                {/* </p> */}
                {/**/}
                {/* <p data-gl-text> */}
                {/*     Open to fresh ideas and teamwork<br /> */}
                {/*     bringing care, focus, and creativity to all. */}
                {/* </p> */}
            </div>

            <div className={styles.about__content}>
                <div className={styles.about__content__column}>
                    <div className={styles.about__information}>
                        <p className={styles.about__information__column} data-gl-text>
                            <a className={styles.about__information__link} href="mailto:aldiyusronazhar@gmail.com">Business Inquiries</a>
                            <br /><br />
                            <a
                                className={styles.about__information__link}
                                href="https://laced-cowl-d2e.notion.site/200901fedabc80a78b86fdb2af0db49f?v=200901fedabc80829735000c77623e3b"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Awards List
                            </a>
                            <br />
                            <a
                                className={styles.about__information__link}
                                href="https://laced-cowl-d2e.notion.site/200901fedabc80dfbaa3d91738442360?v=200901fedabc800e901e000c6709a7d0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Projects List
                            </a>
                        </p>

                        <p className={styles.about__information__column} data-gl-text>
                            <a
                                className={styles.about__information__link}
                                href="https://github.com/aldiyusronazhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            <br />
                            <a
                                className={styles.about__information__link}
                                href="https://instagram.com/aldiyusronzhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram
                            </a>
                            <br />
                            <a
                                className={styles.about__information__link}
                                href="https://linkedin.com/in/aldiyusronazhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                            <br />
                            <a
                                className={styles.about__information__link}
                                href="https://x.com/azh.rz/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                        </p>

                        <p className={styles.about__information__column} data-gl-text>
                            15th April, 2007
                            <br />
                            Banjarnegara, Jawa Tengah
                            <br />
                            Indonesia
                            <br />
                            <br />
                            6.399576° S
                            <br />
                            106.708215° E
                        </p>
                    </div>

                    <a
                        className={styles.about__credits}
                        data-gl-text
                        href="https://instagram.com/_ethzer/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ethzer
                    </a>
                </div>

                <div className={styles.about__content__column}>
                    <figure className={styles.about__media}>
                        <img
                            alt="Aldi Yusron"
                            className={styles.about__media__image}
                            data-gl-media="/shared/photo.jpg"
                            src="/PZP-SIDE.jpg"
                        />
                    </figure>

                    <div className={styles.about__brands}>
                        <h2 className={styles.about__brands__title} data-gl-text>
                            Brands:
                        </h2>

                        <p className={styles.about__brands__description} data-gl-text>
                            OurDoc, Aka Group, Core Initative, TM News
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

