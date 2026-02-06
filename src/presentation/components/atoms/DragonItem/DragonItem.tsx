import React from "react";

import styles from "./DragonItem.module.scss";

interface DragonItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  name: string;
  type: string;
  onDelete?: (event: React.MouseEvent) => void;
  onEditDragon?: (event: React.MouseEvent) => void;
}

export const DragonItem = ({
  name,
  type,
  className,
  onDelete,
  onEditDragon,
  ...rest
}: DragonItemProps) => (
  <li className={`${styles.item} ${className || ""}`.trim()} {...rest}>
    <div className={styles.info}>
      <strong>{name}</strong> - <span>{type}</span>
    </div>

    <div className={styles.actions}>
      {onEditDragon && (
        <button
          type="button"
          className={styles.editBtn}
          onClick={onEditDragon}
          title="Editar dragão"
        >
          ✏️
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={onDelete}
          title="Excluir dragão"
        >
          🗑️
        </button>
      )}
    </div>
  </li>
);
