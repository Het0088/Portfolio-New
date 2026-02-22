import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const heading = sectionRef.current.querySelector(`.${styles.heading}`);
    const cards = gsap.utils.toArray(`.${styles.testimonialCard}`);

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

    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(`.${styles.grid}`),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.testimonials} ref={sectionRef} id="testimonials">
      <div className={styles.sectionNumber} aria-hidden="true">09</div>
      <p className={styles.label}>What People Say</p>
      <h2 className={styles.heading}>Testimonials</h2>

      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div className={styles.testimonialCard} key={t.id}>
            <div className={styles.quoteIcon}>&ldquo;</div>
            <p className={styles.quote}>{t.quote}</p>
            <div className={styles.author}>
              <div className={styles.avatar}>
                {t.name.charAt(0)}
              </div>
              <div>
                <p className={styles.authorName}>{t.name}</p>
                <p className={styles.authorRole}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
