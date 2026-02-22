import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollState } from '../../hooks/useScrollStore';
import { skillCategories } from '../../data/skills';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const categories = gsap.utils.toArray(`.${styles.category}`);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        scrollState.skillsProgress = self.progress;
      },
    });

    // Staggered entrance for category cards
    gsap.from(categories, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Heading reveal
    gsap.from(`.${styles.heading}`, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.skills} ref={sectionRef} id="skills">
      <div className={styles.sectionNumber} aria-hidden="true">04</div>
      <p className={styles.sectionLabel}>Expertise</p>
      <h2 className={styles.heading}>
        Tools & <span className={styles.headingAccent}>Technologies</span>
      </h2>
      <div className={styles.glassWrap}>
        <div className={styles.grid}>
          {skillCategories.map((category) => (
            <div className={styles.category} key={category.title}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.chips}>
                {category.skills.map((skill) => (
                  <span className={styles.chip} key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
