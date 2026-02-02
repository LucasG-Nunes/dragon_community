import styles from "./DragonItem.module.scss";

interface DragonItemProps {
  name: string;
  type: string;
}

export const DragonItem = ({ name, type }: DragonItemProps) => (
  <li className={styles.item}>
    <strong>{name}</strong> - <span>{type}</span>
  </li>
);
