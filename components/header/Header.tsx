'use client';

import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import TagHover from '@/components/ui/taghover/TagHover';

export default function Header() {
    const [time, setTime] = useState(new Date());
    const [glow, setGlow] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlow(true);
            setTimeout(() => setGlow(false), 4000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
    }).format(time);

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__column}>
                    <p className={styles.header__title} data-gl-text="uppercase">
                        Aldi<br />
                        Yusron
                    </p>
                </div>

                {/* <div className={styles.header__column}> */}
                {/*     <p className={styles.header__location} data-gl-text="uppercase"> */}
                {/*         Bogor,<br /> */}
                {/*         Indonesia */}
                {/*     </p> */}
                {/* </div> */}
                <div className={styles.header__column}>
                    <div className={styles.header__location}>
                        <p className={glow ? styles.glow : ''}>+ Bogor, Indonesia</p>
                        {hasMounted && (
                            <p className={glow ? styles.glow : ''}>{formattedTime} (GMT+7)</p>
                        )}
                    </div>
                </div>


                <div className={styles.header__column}>
                    <p className={styles.header__role} data-gl-text="uppercase">
                        Junior Frontend Developer<br />
                        UI/UX Enthusiast
                    </p>
                    <p className={styles.header__year} data-gl-text>
                        07<br />
                        25
                    </p>
                </div>

                <div className={styles.header__column}>
                    <p className={styles.header__shape} data-gl-text></p>
                </div>
            </div>

            <TagHover
                targetClass={styles.header__logo}
                text="Scroll More__"
                iconBg="#ff0000"
            />
            <h1 className={styles.header__logo}>
                <img
                    alt="Ethzer™"
                    className={styles.header__logo__media}
                    src="/yusron.png"
                />
                Azhar™

            </h1>
        </header>
    );
}

