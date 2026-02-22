import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Education.module.css';

gsap.registerPlugin(ScrollTrigger);

const education = {
  degree: 'Diploma in Computer Engineering',
  institution: 'Government Polytechnic',
  location: 'Vadodara, Gujarat',
  year: '3rd Year — 6th Semester (Final)',
  spi: '8.88',
  currentFocus: 'Docker & Containerization',
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Web Development',
    'Software Engineering',
    'AI & Machine Learning',
  ],
};

export default function Education() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const heading = sectionRef.current.querySelector(`.${styles.heading}`);
    const card = sectionRef.current.querySelector(`.${styles.eduCard}`);
    const chips = gsap.utils.toArray(`.${styles.chip}`);

    gsap.from(heading, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    chips.forEach((chip, i) => {
      gsap.from(chip, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.06,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.education} ref={sectionRef} id="education">
      <div className={styles.sectionNumber} aria-hidden="true">05</div>
      <p className={styles.label}>Background</p>
      <h2 className={styles.heading}>Education</h2>

      <div className={styles.eduCard}>
        <div className={styles.cardLeft}>
          <div className={styles.yearBadge}>{education.year}</div>
          <h3 className={styles.degree}>{education.degree}</h3>
          <p className={styles.institution}>{education.institution}</p>
          <p className={styles.location}>{education.location}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{education.spi}</span>
              <span className={styles.statLabel}>SPI</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>6th</span>
              <span className={styles.statLabel}>Semester</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>29+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </div>
        </div>

        <div className={styles.cardRight}>
          <p className={styles.courseworkLabel}>Key Coursework</p>
          <div className={styles.chips}>
            {education.coursework.map((course) => (
              <span key={course} className={styles.chip}>{course}</span>
            ))}
          </div>
          <div className={styles.currentFocus}>
            <span className={styles.focusDot} />
            Currently exploring: <strong>{education.currentFocus}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
