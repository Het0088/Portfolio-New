import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollState } from '../../hooks/useScrollStore';
import styles from './About.module.css';
import portrait from '../../assets/het-portrait.png';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 43, suffix: '+', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 3, suffix: '+', label: 'Years Coding' },
];

export default function About() {
  const sectionRef = useRef(null);
  const [counterValues, setCounterValues] = useState(stats.map(() => 0));

  useGSAP(() => {
    const blocks = gsap.utils.toArray(`.${styles.textBlock}`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          scrollState.aboutProgress = self.progress;
        },
      },
    });

    blocks.forEach((block, i) => {
      tl.fromTo(
        block,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        i * 0.12
      );
    });

    // Parallax on visual column
    tl.fromTo(
      `.${styles.visualColumn}`,
      { y: 100 },
      { y: -100, duration: 1 },
      0
    );

    // Animated counters
    stats.forEach((stat, i) => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 40%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: stat.value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setCounterValues((prev) => {
                const next = [...prev];
                next[i] = Math.round(this.targets()[0].val);
                return next;
              });
            },
          });
        },
        once: true,
      });
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.about} ref={sectionRef} id="about">
      <div className={styles.sectionNumber} aria-hidden="true">02</div>
      <div className={styles.wrapper}>
        <p className={styles.sectionLabel}>About Me</p>

        <div className={styles.textColumn}>
          <div className={styles.textBlock}>
            <h2 className={styles.heading}>
              Turning ideas into{' '}
              <span className={styles.headingAccent}>digital reality</span>
            </h2>
          </div>

          <div className={styles.textBlock}>
            <p className={styles.bio}>
              I'm Het Patel, a full-stack developer from Vadodara, India, with expertise
              in building modern web applications and AI/ML-powered solutions.
              I specialize in creating scalable, user-friendly platforms that bridge the
              gap between complex technology and intuitive design.
            </p>
          </div>

          <div className={styles.textBlock}>
            <p className={styles.bio}>
              From AI-powered research tools and intelligent ML models to
              interactive 3D experiences and full-stack web applications, I thrive on pushing
              the boundaries of what's possible in the browser and beyond.
            </p>
          </div>

          <div className={styles.textBlock}>
            <div className={styles.counters}>
              {stats.map((stat, i) => (
                <div className={styles.counter} key={stat.label}>
                  <span className={styles.counterValue}>
                    {counterValues[i]}{stat.suffix}
                  </span>
                  <span className={styles.counterLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.portraitFrame}>
            <div className={styles.portraitGlow} />
            <img src={portrait} alt="Het Patel" className={styles.portraitImg} />
          </div>
        </div>
      </div>
    </section>
  );
}
