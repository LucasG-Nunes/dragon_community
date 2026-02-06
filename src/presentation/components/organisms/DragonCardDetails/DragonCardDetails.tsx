import styles from "./DragonCardDetails.module.scss";

interface DragonCardDetailsProps {
  name: string;
  type: string;
  createdAt: string;
}

export const DragonCardDetails = ({
  name,
  type,
  createdAt,
}: DragonCardDetailsProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.frame}>
        <div className={styles.header}>
          <span className={styles.rarity}>✦ Ancestral ✦</span>
          <h2 className={styles.name}>{name}</h2>
        </div>

        <div className={styles.visualSection}>
          <div className={styles.dragonIcon}>🐲</div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.badgeRow}>
            <span className={styles.label}>Elemento:</span>
            <span className={styles.typeBadge}>{type}</span>
          </div>

          <div className={styles.history}>
            <p>
              Visto pela primeira vez nas crônicas de{" "}
              <strong>{createdAt}</strong>.
            </p>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>Propriedade da Draco Cave</span>
        </footer>
      </div>
    </article>
  );
};
