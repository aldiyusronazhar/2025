'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './TagHover.module.scss';

type TagHoverProps = {
  targetClass: string;
  text?: string;
  className?: string;
  iconBg?: string;
};

export default function TagHover({
  targetClass,
  text = 'Scroll More',
  className,
  iconBg = '#777777',
}: TagHoverProps) {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const targets = document.querySelectorAll(`.${targetClass}`);
    const tag = tagRef.current;

    if (!targets.length || !tag) return;

    const offsetX = 20;
    const offsetY = 20;
    let isHovering = false;
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const moveTag = (e: MouseEvent) => {
      gsap.to(tag, {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        duration: 0.9,
        ease: 'power3.out',
      });
    };

    const showTag = (e: MouseEvent) => {
      isHovering = true;
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      gsap.set(tag, {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
      });

      tag.style.display = 'flex';

      gsap.to(tag, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        filter: 'blur(0px)',
        scale: 1,
      });

      window.addEventListener('mousemove', moveTag);
    };

    const hideTag = () => {
      isHovering = false;

      gsap.to(tag, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        filter: 'blur(4px)',
        scale: 0.95,
      });

      window.removeEventListener('mousemove', moveTag);

      hideTimeout = setTimeout(() => {
        if (!isHovering) {
          tag.style.display = 'none';
          gsap.set(tag, { x: 0, y: 0 });
        }
      }, 350);
    };

    targets.forEach((target) => {
      target.addEventListener('mouseenter', showTag as EventListener);
      target.addEventListener('mouseleave', hideTag);
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', showTag as EventListener);
        target.removeEventListener('mouseleave', hideTag);
      });
      window.removeEventListener('mousemove', moveTag);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [targetClass]);

  return (
    <div
      ref={tagRef}
      className={`${styles.tagHover} ${className || ''}`}
      style={{ display: 'none', opacity: 0 }}
    >
      <div className={styles.iconBox} style={{ backgroundColor: iconBg }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M6.003,4.017c-0.552,0-1,0.448-1,1v13.969c0,0.552,0.448,1,1,1h17.598l-6.205,6.275c-0.391,0.394-0.391,1.033,0,1.427c0.391,0.394,1.024,0.394,1.414,0l7.899-7.988c0.394-0.398,0.378-1.071-0.026-1.453l-7.873-7.962c-0.391-0.394-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.033,0,1.427l6.188,6.257H7.003V5.017C7.003,4.465,6.556,4.017,6.003,4.017z" />
        </svg>
      </div>
      <span className={styles.tagHover__text}>{text}</span>
    </div>
  );
}

