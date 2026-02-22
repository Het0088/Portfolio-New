import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './GitHubStats.module.css';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'Het0088';

export default function GitHubStats() {
  const sectionRef = useRef(null);
  const [stats, setStats] = useState({
    publicRepos: 29,
    followers: 2,
    following: 2,
    createdAt: '2024',
  });
  const fallbackRepos = [
    { name: 'portfolio', description: 'Personal portfolio website built with React and Three.js', language: 'JavaScript', stars: 0, url: `https://github.com/${GITHUB_USERNAME}/portfolio` },
    { name: 'SIEM-Dashboard', description: 'Enterprise security monitoring system with real-time threat detection', language: 'JavaScript', stars: 0, url: `https://github.com/${GITHUB_USERNAME}/SIEM-Dashboard` },
    { name: 'Ishaara', description: 'Indian Sign Language recognition using ML and computer vision', language: 'Python', stars: 0, url: `https://github.com/${GITHUB_USERNAME}/Ishaara` },
    { name: 'Nexus', description: '3D car advertisement website with interactive model exploration', language: 'JavaScript', stars: 0, url: `https://github.com/${GITHUB_USERNAME}/Nexus` },
    { name: 'GigStack', description: 'Full-stack expense tracker with analytics and budget management', language: 'TypeScript', stars: 0, url: `https://github.com/${GITHUB_USERNAME}/GigStack` },
    { name: 'Phishing-Detector', description: 'URL security scanner using ML classifiers and domain analysis', language: 'Python', stars: 0, url: `https://github.com/${GITHUB_USERNAME}/Phishing-Detector` },
  ];

  const [repos, setRepos] = useState(fallbackRepos);

  useEffect(() => {
    // Fetch live stats from GitHub API
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos) {
          setStats({
            publicRepos: data.public_repos,
            followers: data.followers,
            following: data.following,
            createdAt: new Date(data.created_at).getFullYear().toString(),
          });
        }
      })
      .catch(() => {});

    // Fetch top repos sorted by updated
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(
            data.map((r) => ({
              name: r.name,
              description: r.description || 'No description',
              language: r.language,
              stars: r.stargazers_count,
              url: r.html_url,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useGSAP(() => {
    const heading = sectionRef.current.querySelector(`.${styles.heading}`);
    const statCards = gsap.utils.toArray(`.${styles.statBox}`);
    const repoCards = gsap.utils.toArray(`.${styles.repoCard}`);

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

    statCards.forEach((card, i) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    repoCards.forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(`.${styles.repoGrid}`),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'Jupyter Notebook': '#DA5B0B',
  };

  return (
    <section className={styles.github} ref={sectionRef} id="github">
      <div className={styles.sectionNumber} aria-hidden="true">08</div>
      <p className={styles.label}>Open Source</p>
      <h2 className={styles.heading}>GitHub Activity</h2>

      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{stats.publicRepos}</span>
          <span className={styles.statLabel}>Repositories</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{stats.followers}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{stats.following}</span>
          <span className={styles.statLabel}>Following</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>{stats.createdAt}</span>
          <span className={styles.statLabel}>Since</span>
        </div>
      </div>

      <h3 className={styles.repoHeading}>Recent Repositories</h3>
      <div className={styles.repoGrid}>
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            className={styles.repoCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 className={styles.repoName}>{repo.name}</h4>
            <p className={styles.repoDesc}>{repo.description}</p>
            <div className={styles.repoMeta}>
              {repo.language && (
                <span className={styles.repoLang}>
                  <span
                    className={styles.langDot}
                    style={{ background: langColors[repo.language] || '#8b8b8b' }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className={styles.repoStars}>&#9733; {repo.stars}</span>
              )}
            </div>
          </a>
        ))}
      </div>

      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        className={styles.viewAll}
        target="_blank"
        rel="noopener noreferrer"
      >
        View all on GitHub &rarr;
      </a>
    </section>
  );
}
