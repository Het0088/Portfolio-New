import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Preloader.module.css';

const CIRCUMFERENCE = 2 * Math.PI * 38;

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsLoaded.then(() => setReady(true));
    const fallback = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(fallback);
  }, []);

  useGSAP(() => {
    if (!ready) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => onComplete?.(),
        });
      },
    });

    tl.to(`.${styles.ringWrap}`, {
      opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)',
    }, 0);

    tl.to({ val: CIRCUMFERENCE }, {
      val: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: function () {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = this.targets()[0].val;
        }
      },
    }, 0.2);

    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: function () {
        setCount(Math.round(this.targets()[0].val));
      },
    }, 0.2);

    tl.to(`.${styles.nameChar}`, {
      y: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: 'power3.out',
    }, 0.3);

    tl.to(`.${styles.tagline}`, {
      opacity: 1, y: 0, duration: 0.4, ease: 'power3.out',
    }, 0.6);

    tl.to(`.${styles.barFill}`, {
      scaleX: 1, duration: 1.4, ease: 'power2.inOut',
    }, 0.2);

    tl.to({}, { duration: 0.3 });
  }, { scope: containerRef, dependencies: [ready] });

  const nameChars = 'Het Patel'.split('');

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.ringWrap}>
          <svg viewBox="0 0 80 80" className={styles.ringSvg}>
            <circle
              cx="40" cy="40" r="38"
              fill="none"
              stroke="rgba(108, 99, 255, 0.08)"
              strokeWidth="2"
            />
            <circle
              ref={circleRef}
              cx="40" cy="40" r="38"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              transform="rotate(-90 40 40)"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6c63ff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className={styles.name}>
          {nameChars.map((char, i) => (
            <span className={styles.nameChar} key={i}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className={styles.tagline}>Full-Stack Developer & Creative Coder</p>
        <div className={styles.bottomArea}>
          <span className={styles.counter}>{count}%</span>
          <div className={styles.bar}>
            <div className={styles.barFill} />
          </div>
        </div>
      </div>
    </div>
  );
}
