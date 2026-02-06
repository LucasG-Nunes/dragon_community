import styles from "./Loader.module.scss";

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = "Carregando" }: LoaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.ritualWrapper}>
        <div className={styles.fireCircle}></div>
        <span className={styles.dragonIcon}>🐲</span>
      </div>

      <p className={styles.loadingText}>
        {message}
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    </div>
  );
};
