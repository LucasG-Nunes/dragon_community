import { useEffect, useState } from "react";

import tavernaLogo from "../../../../assets/taverna_logo.png";

import styles from "./GatewaySuspense.module.scss";

interface GatewaySuspenseProps {
  message?: string;
  duration?: number;
  onFinished?: () => void;
}

export const GatewaySuspense = ({
  message = "Invocando Portal",
  duration = 3500,
  onFinished,
}: GatewaySuspenseProps) => {
  const [dots, setDots] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 6 ? prev + " ." : ""));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 1000);

    const finishTimer = setTimeout(() => {
      if (onFinished) onFinished();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinished]);

  return (
    <div className={`${styles.overlay} ${isExiting ? styles.fadeOut : ""}`}>
      <div className={styles.content}>
        <div className={styles.gatewayIcon}>
          <img src={tavernaLogo} alt="Portal" className={styles.pulse} />
        </div>

        <div className={styles.textContainer}>
          <p className={styles.message}>{message}</p>
          <span className={styles.dots}>{dots}</span>
        </div>
      </div>

      <div className={styles.mistOverlay} />
    </div>
  );
};
