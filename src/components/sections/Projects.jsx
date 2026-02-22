import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollState } from '../../hooks/useScrollStore';
import { projects } from '../../data/projects';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

export default function Projects() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const cardsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Card mouse tracking for 3D tilt + spotlight
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (x - 0.5) * 12;
    const tiltY = -(y - 0.5) * 12;

    gsap.to(card, {
      rotateY: tiltX,
      rotateX: tiltY,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Update CSS custom properties for spotlight
    card.style.setProperty('--mouse-x', `${x * 100}%`);
    card.style.setProperty('--mouse-y', `${y * 100}%`);
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  useGSAP(() => {
    const mm = ScrollTrigger.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const panels = gsap.utils.toArray(`.${styles.panel}`);
      const totalScroll = (panels.length - 1) * window.innerWidth;

      const scrollTween = gsap.to(innerRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${totalScroll}`,
          onUpdate: (self) => {
            scrollState.projectsProgress = self.progress;
            // Update progress counter
            const idx = Math.round(self.progress * (panels.length - 1)) + 1;
            setCurrentIndex(idx);
          },
        },
      });

      // Per-card staggered entrance animations
      panels.forEach((panel) => {
        const card = panel.querySelector(`.${styles.card}`);
        const watermark = panel.querySelector(`.${styles.watermark}`);
        const orbs = panel.querySelectorAll(`.${styles.gradientOrb}`);
        const scanLine = panel.querySelector(`.${styles.scanLine}`);
        const gridBg = panel.querySelector(`.${styles.gridBg}`);
        const vertLine = panel.querySelector(`.${styles.vertLine}`);
        if (!card) return;

        // Watermark parallax (moves slower)
        if (watermark) {
          gsap.fromTo(watermark,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 100%',
                end: 'left 20%',
                scrub: true,
              },
            }
          );
        }

        // Gradient orbs fade in softly
        if (orbs.length) {
          gsap.fromTo(orbs,
            { opacity: 0, scale: 0.6 },
            {
              opacity: 0.06,
              scale: 1,
              stagger: 0.15,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 80%',
                end: 'left 30%',
                scrub: true,
              },
            }
          );
        }

        // Scan line sweeps from top to bottom on entrance
        if (scanLine) {
          gsap.fromTo(scanLine,
            { top: '10%', opacity: 0 },
            {
              top: '90%',
              opacity: 0.3,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 90%',
                end: 'left 20%',
                scrub: true,
              },
            }
          );
        }

        // Grid background fades in
        if (gridBg) {
          gsap.fromTo(gridBg,
            { opacity: 0 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 90%',
                end: 'left 50%',
                scrub: true,
              },
            }
          );
        }

        // Vertical accent line draws in
        if (vertLine) {
          gsap.fromTo(vertLine,
            { height: 0 },
            {
              height: '50%',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 70%',
                end: 'left 30%',
                scrub: true,
              },
            }
          );
        }

        // Card entrance
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    mm.add('(max-width: 767px)', () => {
      const cards = gsap.utils.toArray(`.${styles.card}`);
      cards.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.projects} ref={sectionRef} id="projects">
      <p className={styles.sectionTitle}>Selected Work</p>
      <p className={styles.progress}>
        <span className={styles.progressCurrent}>{pad(currentIndex)}</span>
        {' / '}
        {pad(projects.length)}
      </p>

      <div className={styles.inner} ref={innerRef}>
        {projects.map((project, i) => (
          <div
            className={styles.panel}
            key={project.id}
            style={{ '--card-accent': project.color }}
          >
            {/* Background watermark number */}
            <span className={styles.watermark}>{pad(i + 1)}</span>

            {/* Dot grid background */}
            <div className={styles.gridBg} />

            {/* Refined gradient orbs (2 per panel, positioned at corners) */}
            <div
              className={styles.gradientOrb}
              style={{ background: project.color }}
            />
            <div
              className={styles.gradientOrb}
              style={{ background: project.color }}
            />

            {/* Horizontal scan line */}
            <div className={styles.scanLine} />

            {/* Thin structural rails */}
            <div className={styles.horizRail} />
            <div className={styles.horizRail} />

            {/* Corner bracket marks */}
            <div className={styles.cornerMarks} />

            {/* Vertical accent line */}
            <div className={styles.vertLine} />

            {/* Card */}
            <div
              className={styles.card}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              style={{ '--card-accent': project.color }}
            >
              {/* Header: number + category */}
              <div className={styles.cardHeader}>
                <p className={styles.cardNumber}>{pad(i + 1)}</p>
                <span className={styles.cardCategory}>{project.category}</span>
              </div>

              <h3 className={styles.cardTitle}>{project.title}</h3>

              {/* Accent divider line */}
              <div
                className={styles.cardDivider}
                style={{ background: project.color }}
              />

              <p className={styles.cardDescription}>{project.description}</p>

              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span
                    className={styles.tag}
                    key={tag}
                    style={{
                      background: `${project.color}12`,
                      color: project.color,
                      borderColor: `${project.color}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <a
                  className={styles.cardLink}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: project.color }}
                >
                  View Project <span className={styles.arrow}>&rarr;</span>
                </a>
              </div>

              {/* Decorative dot pattern */}
              <div className={styles.dotPattern}>
                {Array.from({ length: 9 }).map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={styles.dot}
                    style={{ background: project.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
