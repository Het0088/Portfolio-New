import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollState } from '../../hooks/useScrollStore';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const nameInners = gsap.utils.toArray(`.${styles.nameInner}`);
    const meta = containerRef.current.querySelector(`.${styles.meta}`);
    const actions = containerRef.current.querySelector(`.${styles.actions}`);
    const cornerTag = containerRef.current.querySelector(`.${styles.cornerTag}`);
    const bgNumber = containerRef.current.querySelector(`.${styles.bgNumber}`);
    const bottomBar = containerRef.current.querySelector(`.${styles.bottomBar}`);
    const textRing = containerRef.current.querySelector(`.${styles.textRing}`);
    const codeCard = containerRef.current.querySelector(`.${styles.codeCard}`);
    const accents = containerRef.current.querySelector(`.${styles.accents}`);
    const techChips = containerRef.current.querySelector(`.${styles.techChips}`);
    const rightVisuals = containerRef.current.querySelector(`.${styles.rightVisuals}`);

    // Entry timeline — plays after preloader (delay 2.8s)
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 2.8,
    });

    tl.from(bgNumber, {
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
      })
      .from(cornerTag, {
        opacity: 0,
        y: -10,
        duration: 0.8,
      }, '-=1.6')
      .from(meta, {
        opacity: 0,
        y: 16,
        duration: 0.9,
      }, '-=1.2')
      // Label: name + right-side visuals all enter together
      .addLabel('reveal', '-=0.7')
      .from(nameInners, {
        y: '110%',
        stagger: 0.12,
        duration: 1.1,
      }, 'reveal')
      .from(textRing, {
        opacity: 0,
        scale: 0.8,
        rotation: -30,
        duration: 1.2,
        ease: 'power2.out',
      }, 'reveal')
      .from(codeCard, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
      }, 'reveal+=0.15')
      .from(gsap.utils.toArray(`.${styles.techChip}`), {
        opacity: 0,
        scale: 0.6,
        stagger: 0.07,
        duration: 0.8,
        ease: 'back.out(1.4)',
      }, 'reveal+=0.2')
      .from(accents, {
        opacity: 0,
        duration: 0.6,
      }, 'reveal+=0.3')
      .from(actions, {
        opacity: 0,
        y: 20,
        duration: 0.9,
      }, 'reveal+=0.5')
      .from(bottomBar, {
        opacity: 0,
        duration: 0.8,
      }, 'reveal+=0.6');

    // Scroll indicator pulse
    gsap.to(`.${styles.scrollLine}`, {
      scaleY: 0.35,
      opacity: 0.15,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Scroll-away: pin then content drifts up
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=65%',
        scrub: 1.2,
        pin: true,
        onUpdate: (self) => {
          scrollState.heroProgress = self.progress;
        },
      },
    });

    scrollTl
      .fromTo(`.${styles.content}`, {
        y: 0,
        opacity: 1,
        scale: 1,
      }, {
        y: -160,
        opacity: 0,
        scale: 0.92,
        duration: 0.6,
        immediateRender: false,
      }, 0.35)
      .fromTo(bgNumber, {
        opacity: 0.022,
        scale: 1,
      }, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        immediateRender: false,
      }, 0.35)
      .fromTo(bottomBar, {
        opacity: 1,
        y: 0,
      }, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        immediateRender: false,
      }, 0.4)
      .fromTo(cornerTag, {
        opacity: 0.35,
      }, {
        opacity: 0,
        duration: 0.5,
        immediateRender: false,
      }, 0.4)
      .fromTo(rightVisuals, {
        opacity: 1,
      }, {
        opacity: 0,
        duration: 0.5,
        immediateRender: false,
      }, 0.4);
  }, { scope: containerRef });

  return (
    <section className={styles.hero} ref={containerRef} id="hero">
      {/* Giant faded section number */}
      <div className={styles.bgNumber} aria-hidden="true">01</div>

      {/* Top-right corner tag */}
      <div className={styles.cornerTag}>
        <span>Het Patel</span>
        <span>Portfolio 2025</span>
      </div>

      {/* Main content — anchored bottom-left */}
      <div className={styles.content}>
        <p className={styles.meta}>
          <span>Full-Stack Developer</span>
          <span className={styles.metaDot}>·</span>
          <span>AI / ML Enthusiast</span>
          <span className={styles.metaDot}>·</span>
          <span>Creative Coder</span>
        </p>

        <h1 className={styles.name}>
          <span className={styles.nameLine}>
            <span className={styles.nameInner}>Het</span>
          </span>
          <span className={styles.nameLine}>
            <span className={styles.nameInner}>Patel</span>
          </span>
        </h1>

        <div className={styles.actions}>
          <a href="#projects" className={styles.ctaBtn}>
            View Work
          </a>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for work
          </div>
        </div>
      </div>

      {/* Right-side visuals wrapper — scroll-away fades this container */}
      <div className={styles.rightVisuals} aria-hidden="true">
        {/* Rotating text ring */}
        <div className={styles.textRing}>
          <svg viewBox="0 0 280 280">
            <defs>
              <path
                id="ringPath"
                d="M 140,140 m -110,0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0"
                fill="none"
              />
            </defs>
            <circle cx="140" cy="140" r="60" className={styles.ringCircle} />
            <text className={styles.ringText}>
              <textPath href="#ringPath" startOffset="0%">
                CREATIVE CODER &nbsp;// &nbsp;FULL STACK DEVELOPER &nbsp;// &nbsp;AI ENTHUSIAST &nbsp;//&nbsp;
              </textPath>
            </text>
          </svg>
        </div>

        {/* Code snippet glass card */}
        <div className={styles.codeCard}>
          <div className={styles.codeCardHeader}>
            <span className={styles.codeCardDot} />
            <span className={styles.codeCardDot} />
            <span className={styles.codeCardDot} />
          </div>
          <div className={styles.codeLine}>
            <span className={styles.codeKeyword}>const</span>{' '}
            <span className={styles.codeVar}>het</span>{' '}
            <span className={styles.codePunc}>=</span>{' '}
            <span className={styles.codeBracket}>{'{'}</span>
          </div>
          <div className={styles.codeLine}>
            {'  '}<span className={styles.codeKey}>role</span>
            <span className={styles.codePunc}>:</span>{' '}
            <span className={styles.codeString}>"Full-Stack Dev"</span>
            <span className={styles.codePunc}>,</span>
          </div>
          <div className={styles.codeLine}>
            {'  '}<span className={styles.codeKey}>passion</span>
            <span className={styles.codePunc}>:</span>{' '}
            <span className={styles.codeString}>"Creative Code"</span>
            <span className={styles.codePunc}>,</span>
          </div>
          <div className={styles.codeLine}>
            {'  '}<span className={styles.codeKey}>focus</span>
            <span className={styles.codePunc}>:</span>{' '}
            <span className={styles.codeBracket}>[</span>
            <span className={styles.codeString}>"AI/ML"</span>
            <span className={styles.codePunc}>,</span>{' '}
            <span className={styles.codeString}>"Web3D"</span>
            <span className={styles.codeBracket}>]</span>
            <span className={styles.codePunc}>,</span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.codeBracket}>{'}'}</span>
            <span className={styles.codePunc}>;</span>
          </div>
        </div>

        {/* Decorative accent marks */}
        <div className={styles.accents}>
          <div className={styles.accentLine} />
          <div className={styles.accentCross}>+</div>
          <div className={styles.accentDots}>
            <span className={styles.accentDot} />
            <span className={styles.accentDot} />
            <span className={styles.accentDot} />
          </div>
          <div className={styles.accentAngle}>{'< />'}</div>
        </div>

        {/* Floating tech chips */}
        <div className={styles.techChips}>
          <span className={`${styles.techChip} ${styles.chipFloat1}`}>
            <span className={styles.chipDot} style={{ background: '#61dafb' }} />React
          </span>
          <span className={`${styles.techChip} ${styles.chipFloat2}`}>
            <span className={styles.chipDot} style={{ background: '#68a063' }} />Node.js
          </span>
          <span className={`${styles.techChip} ${styles.chipFloat3}`}>
            <span className={styles.chipDot} style={{ background: '#3572A5' }} />Python
          </span>
          <span className={`${styles.techChip} ${styles.chipFloat4}`}>
            <span className={styles.chipDot} style={{ background: '#3178c6' }} />TypeScript
          </span>
          <span className={`${styles.techChip} ${styles.chipFloat5}`}>
            <span className={styles.chipDot} style={{ background: '#f1e05a' }} />Next.js
          </span>
          <span className={`${styles.techChip} ${styles.chipFloat6}`}>
            <span className={styles.chipDot} style={{ background: '#ff6f00' }} />TensorFlow
          </span>
          <span className={`${styles.techChip} ${styles.chipFloat7}`}>
            <span className={styles.chipDot} style={{ background: '#049EF4' }} />Three.js
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span className={styles.location}>Vadodara · India</span>
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
