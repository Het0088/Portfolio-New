import styles from './MobileBackground.module.css';

export default function MobileBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
    </div>
  );
}
