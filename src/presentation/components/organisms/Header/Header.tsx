import type React from "react";

import styles from "./Header.module.scss";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}

export const Header = ({ title, ...rest }: HeaderProps) => {
  return (
    <header className={styles.header} {...rest}>
      <div className={styles.titleArea}>
        <h1>{title}</h1>
      </div>
      <div className={styles.userArea}>
        <span>Mestre dos Dragões</span>
        <div className={styles.avatar}>🛡️</div>
      </div>
    </header>
  );
};
