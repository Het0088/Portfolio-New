import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollState } from '../../hooks/useScrollStore';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Het0088',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/het-patel-a37881323/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/HetPatel0088',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/simple_people_0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hetpatel222008@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-8.25 5.25a2.25 2.25 0 01-2.5 0L2.25 6.75" />
      </svg>
    ),
  },
];

const RATE_LIMIT_MS = 30000;
let lastSubmitTime = 0;

function sanitize(str) {
  return str.replace(/[<>]/g, '').trim().slice(0, 1000);
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const cleaned = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      message: sanitize(formData.message),
    };

    if (!cleaned.name || !cleaned.email || !cleaned.message) return;

    setStatus('sending');
    lastSubmitTime = now;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleaned),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  useGSAP(() => {
    gsap.fromTo(`.${styles.heading}`,
      { y: 80, opacity: 0, scale: 0.92 },
      {
        y: 0, opacity: 1, scale: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.fromTo(`.${styles.subtext}`,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.fromTo(`.${styles.formWrap}`,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.fromTo(`.${styles.link}`,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className={styles.contact} ref={sectionRef} id="contact">
      <div className={styles.sectionNumber} aria-hidden="true">08</div>
      <p className={styles.sectionLabel}>Get in Touch</p>
      <h2 className={styles.heading}>
        Let's build something{' '}
        <span className={styles.headingAccent}>great</span>
      </h2>
      <p className={styles.subtext}>
        Have a project in mind? I'd love to collaborate and bring your
        ideas to life. Let's create something extraordinary together.
      </p>

      <form className={styles.formWrap} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="name">Name</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="message">Message</label>
          <textarea
            className={styles.textarea}
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={2000}
          />
        </div>
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'idle' && 'Send Message'}
          {status === 'sending' && 'Sending...'}
          {status === 'success' && 'Message Sent!'}
          {status === 'error' && 'Failed — Try Again'}
        </button>
      </form>

      <div className={styles.divider} />

      <div className={styles.links}>
        {contactLinks.map((item) => (
          <a
            key={item.label}
            className={styles.link}
            href={item.href}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
