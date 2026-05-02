import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Education.module.css';

gsap.registerPlugin(ScrollTrigger);

const educationList = [
  {
    degree: 'B.Tech in Computer Engineering',
    specialization: 'Specialization in AI & ML',
    institution: 'Parul University',
    location: 'Vadodara, Gujarat',
    year: '2nd Year — 3rd Semester (Present)',
    spi: '—',
    semester: '3rd',
    projects: '43+',
    currentFocus: 'Deep Learning & Cloud Architecture',
    coursework: [
      'Data Structures & Algorithms',
      'Discrete Mathematics',
      'Object-Oriented Programming',
      'Computer Organization',
      'Linear Algebra',
      'AI & Machine Learning',
    ],
    present: true,
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Parul University, PIET (DS)',
    location: 'Vadodara, Gujarat',
    year: '3rd Year — 6th Semester (Completed)',
    spi: '8.90',
    semester: '6th',
    projects: '29+',
    currentFocus: 'Docker & Containerization',
    coursework: [
      'Database Management Systems',
      'Computer Networks',
      'Operating Systems',
      'Web Development',
      'Software Engineering',
    ],
    present: false,
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function Education() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(() => {
    const mm = ScrollTrigger.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const panels = gsap.utils.toArray(`.${styles.panel}`);
      const totalScroll = (panels.length - 1) * window.innerWidth * 1.5;

      const scrollTween = gsap.to(innerRef.current, {
        x: () => -(panels.length - 1) * window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const left = panel.querySelector(`.${styles.panelLeft}`);
        const card = panel.querySelector(`.${styles.eduCard}`);
        const num = panel.querySelector(`.${styles.bigNumber}`);

        if (num) {
          gsap.fromTo(num,
            { y: 80, opacity: 0 },
            {
              y: 0, opacity: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 80%',
                end: 'left 40%',
                scrub: true,
              },
            }
          );
        }

        if (left) {
          gsap.fromTo(left,
            { x: -40, opacity: 0 },
            {
              x: 0, opacity: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 75%',
                end: 'left 35%',
                scrub: true,
              },
            }
          );
        }

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
      gsap.utils.toArray(`.${styles.eduCard}`).forEach((card) => {
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
    <section className={styles.education} ref={sectionRef} id="education">
      <p className={styles.sectionTitle}>Background</p>

      <div className={styles.inner} ref={innerRef}>
        {educationList.map((edu, i) => (
          <div className={styles.panel} key={edu.degree} style={{ '--card-accent': edu.present ? '#50fa7b' : 'var(--color-accent)' }}>
            <div className={styles.panelLeft}>
              <span className={styles.bigNumber}>{pad(i + 1)}</span>
              <span className={styles.categoryLabel}>
                {edu.present ? 'Current' : 'Completed'}
              </span>
              <div className={styles.accentLine} style={{ background: edu.present ? '#50fa7b' : 'var(--color-accent)' }} />
            </div>

            <div className={`${styles.eduCard} ${edu.present ? styles.present : ''}`}>
              <div className={styles.cardAccent} />
              <div className={styles.cardLeft}>
                <div className={styles.yearBadge}>
                  {edu.year}
                  {edu.present && <span className={styles.liveDot} />}
                </div>
                <h3 className={styles.degree}>{edu.degree}</h3>
                {edu.specialization && (
                  <p className={styles.specialization}>{edu.specialization}</p>
                )}
                <p className={styles.institution}>{edu.institution}</p>
                <p className={styles.location}>{edu.location}</p>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{edu.spi}</span>
                    <span className={styles.statLabel}>SPI</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{edu.semester}</span>
                    <span className={styles.statLabel}>Semester</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{edu.projects}</span>
                    <span className={styles.statLabel}>Projects</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardRight}>
                <p className={styles.courseworkLabel}>Key Coursework</p>
                <div className={styles.chips}>
                  {edu.coursework.map((course) => (
                    <span key={course} className={styles.chip}>{course}</span>
                  ))}
                </div>
                <div className={styles.currentFocus}>
                  <span className={styles.focusDot} />
                  {edu.present ? 'Currently exploring: ' : 'Explored: '}
                  <strong>{edu.currentFocus}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
