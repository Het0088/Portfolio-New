import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { lenisInstance } from '../../hooks/useSmoothScroll';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Certs' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHidden(currentScroll > lastScroll && currentScroll > 100);
      lastScroll = currentScroll;

      // Update progress bar
      if (progressRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
        progressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });
  });

  const scrollTo = (id) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(id === 'hero' ? 0 : `#${id}`, { offset: 0 });
    } else {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`${styles.nav} ${hidden ? styles.hidden : ''}`}
      ref={navRef}
    >
      <div className={styles.progressBar} ref={progressRef} />
      <a className={styles.logo} href="#hero" onClick={() => scrollTo('hero')}>
        Het<span className={styles.logoAccent}>.</span>
      </a>
      <ul className={styles.links}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              className={`${styles.link} ${activeSection === id ? styles.linkActive : ''}`}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
