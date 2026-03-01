import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { certifications } from '../../data/certifications';
import styles from './Achievements.module.css';

gsap.registerPlugin(ScrollTrigger);

const issuerIcons = {
  Microsoft: (
    <svg viewBox="0 0 23 23" className={styles.issuerIcon}>
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
    </svg>
  ),
  Google: (
    <svg viewBox="0 0 24 24" className={styles.issuerIcon}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  ),
  Meta: (
    <svg viewBox="0 0 24 24" className={styles.issuerIcon}>
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a4.892 4.892 0 0 0 1.12 2.15c.554.59 1.274.928 2.1.928 1.018 0 1.985-.318 2.9-.951a14.058 14.058 0 0 0 2.675-2.6L12 12.22l2.995 3.73a14.058 14.058 0 0 0 2.676 2.6c.914.633 1.881.95 2.899.95.826 0 1.546-.337 2.1-.928a4.892 4.892 0 0 0 1.12-2.15c.14-.604.21-1.267.21-1.973 0-2.566-.704-5.24-2.044-7.303C20.768 5.31 19.053 4.03 17.085 4.03c-1.042 0-2.088.363-3.135 1.09A13.66 13.66 0 0 0 12 7.088a13.66 13.66 0 0 0-1.95-1.968C8.003 4.393 6.957 4.03 6.915 4.03z" fill="#0668E1" />
    </svg>
  ),
  Anthropic: (
    <svg viewBox="0 0 24 24" className={styles.issuerIcon}>
      <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm1.04 4.66L5.2 14.39h4.818L7.609 8.18z" fill="#d4a574" />
    </svg>
  ),
  'University of Michigan': (
    <svg viewBox="0 0 24 24" className={styles.issuerIcon}>
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7L12 19.82 4 15.5v-7L12 4.18z" fill="#ffcb05" />
      <path d="M12 6l-6 3v6l6 3 6-3V9l-6-3z" fill="#00274C" />
    </svg>
  ),
  Coursera: (
    <svg viewBox="0 0 24 24" className={styles.issuerIcon}>
      <path d="M11.374.656C5.086.656 0 5.742 0 12.03s5.086 11.374 11.374 11.374c6.288 0 11.374-5.086 11.374-11.374S17.662.656 11.374.656zm3.88 15.321a.549.549 0 0 1-.295.186c-1.647.591-3.08.876-4.31.876-2.332 0-4.193-.84-5.337-2.463-1.073-1.525-1.092-3.381-.06-4.914 1.066-1.584 2.957-2.49 5.184-2.49 1.237 0 2.675.286 4.277.85a.548.548 0 0 1 .33.703l-.746 2.081a.548.548 0 0 1-.713.327c-1.107-.39-2.122-.587-3.015-.587-1.193 0-2.098.376-2.664 1.015-.53.598-.529 1.322.003 2.079.599.852 1.651 1.31 3.044 1.31.913 0 1.965-.206 3.128-.613a.548.548 0 0 1 .71.331l.764 2.098a.547.547 0 0 1-.3.711z" fill="#0056D2" />
    </svg>
  ),
};

const uniqueIssuers = [...new Set(certifications.map((c) => c.issuer))].length;

const half = Math.ceil(certifications.length / 2);
const rowA = certifications.slice(0, half);
const rowB = certifications.slice(half);

function CertCard({ cert }) {
  return (
    <div className={styles.certCard} style={{ '--cert-color': cert.color }}>
      <div className={styles.cardShine} />
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <div className={styles.issuerBadge}>
            {issuerIcons[cert.issuer] || null}
            <span className={styles.issuerName}>{cert.issuer}</span>
          </div>
          <span className={styles.date}>{cert.date}</span>
        </div>
        <h4 className={styles.certTitle}>{cert.title}</h4>
        <div className={styles.cardFooter}>
          <span className={styles.credentialId}>{cert.credentialId}</span>
          <span className={styles.verifiedTag}>
            <svg viewBox="0 0 24 24" className={styles.verifiedIcon}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction }) {
  const doubled = [...items, ...items];
  return (
    <div className={styles.marqueeTrack}>
      <div className={`${styles.marqueeSlide} ${direction === 'right' ? styles.slideRight : styles.slideLeft}`}>
        {doubled.map((cert, i) => (
          <CertCard cert={cert} key={`${cert.id}-${i}`} />
        ))}
      </div>
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(`.${styles.headerArea}`, {
      y: 60, opacity: 0, scale: 0.95,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    gsap.from(`.${styles.marqueeTrack}`, {
      opacity: 0, y: 30,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.achievements} ref={sectionRef} id="achievements">
      <div className={styles.sectionNumber} aria-hidden="true">06</div>

      <div className={styles.headerArea}>
        <p className={styles.label}>Credentials</p>
        <h2 className={styles.heading}>
          Certifications <span className={styles.headingAccent}>&</span> Recognition
        </h2>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{certifications.length}</span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{uniqueIssuers}</span>
            <span className={styles.statLabel}>Issuers</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>3+</span>
            <span className={styles.statLabel}>Years Learning</span>
          </div>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeEdgeLeft} />
        <MarqueeRow items={rowA} direction="left" />
        <MarqueeRow items={rowB} direction="right" />
        <div className={styles.marqueeEdgeRight} />
      </div>
    </section>
  );
}
