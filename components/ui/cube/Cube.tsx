'use client';
import styles from './Cube.module.scss';

export default function Cube() {
    return (
        <div className={styles.cube__container}>
            <div className={`${styles.cube} ${styles.animated}`}>
                <div className={`${styles.side} ${styles.front}`}></div>
                <div className={`${styles.side} ${styles.left}`}></div>
                <div className={`${styles.side} ${styles.right}`}></div>
                <div className={`${styles.side} ${styles.back}`}></div>
                <div className={`${styles.side} ${styles.top}`}></div>
                <div className={`${styles.side} ${styles.bottom}`}></div>
            </div>
        </div>
    );
}


