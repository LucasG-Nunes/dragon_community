import type { ReactNode } from "react";

import styles from "./PublicTemplate.module.scss";

interface PublicTemplateProps {
  children: ReactNode;
}

export const PublicTemplate = ({ children }: PublicTemplateProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.minimalHeader}>
        <span>Dragon Community 🐉</span>
      </header>

      <main className={styles.centerContent}>{children}</main>
    </div>
  );
};
