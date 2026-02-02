import type { Dragon } from "../../../../core/entities/Dragon";
import { DragonItem } from "../../atoms/DragonItem/DragonItem";

import styles from "./DragonList.module.scss";

interface DragonListProps {
  dragons: Dragon[];
}

export const DragonList = ({ dragons }: DragonListProps) => (
  <ul className={styles.list}>
    {dragons.map((dragon) => (
      <DragonItem key={dragon.id} name={dragon.name} type={dragon.type} />
    ))}
  </ul>
);
