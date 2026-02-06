import type React from "react";
import { useNavigate } from "react-router-dom"; // Hook de navegação

import type { Dragon } from "../../../../core/entities/Dragon";
import { DragonItem } from "../../atoms/DragonItem/DragonItem";

import styles from "./DragonList.module.scss";

interface DragonListProps extends React.HTMLAttributes<HTMLUListElement> {
  dragons: Dragon[];
  onDeleteDragon: (id: string, name: string) => void;
  onEditDragon: (dragon: Dragon) => void;
}

export const DragonList = ({
  dragons,
  onDeleteDragon,
  onEditDragon,
  ...rest
}: DragonListProps) => {
  const navigate = useNavigate();

  return (
    <ul className={styles.list} {...rest}>
      {dragons.map((dragon) => (
        <DragonItem
          key={dragon.id}
          name={dragon.name}
          type={dragon.type}
          onClick={() => navigate(`/dragon/${dragon.id}`)}
          onDelete={(e) => {
            e.stopPropagation();
            onDeleteDragon(dragon.id, dragon.name);
          }}
          onEditDragon={(e) => {
            e.stopPropagation();
            onEditDragon(dragon);
          }}
        />
      ))}
    </ul>
  );
};
