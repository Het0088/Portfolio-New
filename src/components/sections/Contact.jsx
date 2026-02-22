import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollState } from '../../hooks/useScrollStore';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/Het0088' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/het-patel-a37881323/' },
  { label: 'Twitter', href: 'https://twitter.com/HetPatel0088' },
  { label: 'Instagram', href: 'https://instagram.com/simple_people_0' },
];

// Get your free access key at https://web3forms.com/
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
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
    gsap.from(`.${styles.heading}`, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: (self) => {
          scrollState.contactProgress = self.progress;
        },
      },
      y: 100,
      opacity: 0,
      scale: 0.9,
    });

    gsap.from(`.${styles.subtext}`, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
      },
      y: 60,
      opacity: 0,
    });

    gsap.from(`.${styles.formWrap}`, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from(`.${styles.link}`, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.contact} ref={sectionRef} id="contact">
      <div className={styles.sectionNumber} aria-hidden="true">11</div>
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

      <a className={styles.email} href="mailto:hetpatel222008@gmail.com">
        hetpatel222008@gmail.com
      </a>

      <p className={styles.linksLabel}>Find me on</p>
      <div className={styles.links}>
        {contactLinks.map((item) => (
          <a
            key={item.label}
            className={styles.link}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
