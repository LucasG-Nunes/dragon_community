import type { ReactNode } from "react";

import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <header className={styles.header}>
          {title && <h3>{title}</h3>}
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
