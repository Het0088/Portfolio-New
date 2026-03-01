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
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=180%',
      scrub: 1.2,
      pin: true,
      onUpdate: (self) => {
        scrollState.skillsProgress = self.progress;
      },
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.skills} ref={sectionRef} id="skills">
      <div className={styles.sectionNumber} aria-hidden="true">03</div>
      <div className={styles.headerGlass}>
        <p className={styles.sectionLabel}>Expertise</p>
        <h2 className={styles.heading}>
          Tools & <span className={styles.headingAccent}>Technologies</span>
        </h2>
      </div>
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
