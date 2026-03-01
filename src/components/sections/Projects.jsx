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

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(card, {
      rotateY: (x - 0.5) * 6,
      rotateX: -(y - 0.5) * 6,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    });

    card.style.setProperty('--mouse-x', `${x * 100}%`);
    card.style.setProperty('--mouse-y', `${y * 100}%`);
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
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
            setCurrentIndex(Math.round(self.progress * (panels.length - 1)) + 1);
          },
        },
      });

      panels.forEach((panel) => {
        const card = panel.querySelector(`.${styles.card}`);
        if (card) {
          gsap.fromTo(card,
            { y: 40, opacity: 0, scale: 0.95 },
            {
              y: 0, opacity: 1, scale: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
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
          <div className={styles.panel} key={project.id} style={{ '--card-accent': project.color }}>
            <span className={styles.watermarkNum}>{pad(i + 1)}</span>

            <div
              className={styles.card}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className={styles.cardAccent} />
              <div className={styles.cardSpotlight} />

              <div className={styles.cardCategory}>{project.category}</div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
