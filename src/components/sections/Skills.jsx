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
    const header = sectionRef.current.querySelector(`.${styles.headerGlass}`);
    const glassWrap = sectionRef.current.querySelector(`.${styles.glassWrap}`);
    const categories = gsap.utils.toArray(`.${styles.category}`);
    const mm = ScrollTrigger.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1.2,
          pin: true,
          onUpdate: (self) => {
            scrollState.skillsProgress = self.progress;
          },
        },
      });

      tl.fromTo(header,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12 },
        0
      );

      tl.fromTo(glassWrap,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15 },
        0.05
      );

      categories.forEach((cat, i) => {
        tl.fromTo(cat,
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.12 },
          0.1 + i * 0.06
        );
      });

      tl.to(header, { y: -30, opacity: 0, duration: 0.15 }, 0.8);
      tl.to(glassWrap, { y: -40, opacity: 0, duration: 0.15 }, 0.82);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(header, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      categories.forEach((cat, i) => {
        gsap.from(cat, {
          y: 30, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: glassWrap,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
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
