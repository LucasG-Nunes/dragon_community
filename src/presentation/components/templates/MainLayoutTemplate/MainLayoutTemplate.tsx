import type { ReactNode } from "react";

import styles from "./MainLayoutTemplate.module.scss";

interface MainLayoutTemplateProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export const MainLayoutTemplate = ({
  sidebar,
  header,
  children,
}: MainLayoutTemplateProps) => {
  return (
    <div className={styles.gridContainer}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <header className={styles.header}>{header}</header>
      <main className={styles.content}>{children}</main>
    </div>
  );
};
