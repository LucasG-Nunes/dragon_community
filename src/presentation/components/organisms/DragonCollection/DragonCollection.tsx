import { useState } from "react";

import type { Dragon } from "../../../../core/entities/Dragon";
import { useDeleteDragon } from "../../../hooks/useDeleteDragon";
import { useDragons } from "../../../hooks/useDragons";
import { useUpdateDragon } from "../../../hooks/useUpdateDragon";
import { DragonList } from "../../molecules/DragonList/DragonList";
import { Modal } from "../../molecules/Modal/Modal";
import { DragonForm } from "../DragonForm/DragonForm";

export const DragonCollection = () => {
  const { data: dragons } = useDragons();
  const { mutateAsync: deleteDragon } = useDeleteDragon();
  const { mutateAsync: updateDragon, isPending: isUpdating } =
    useUpdateDragon();

  const [editingDragon, setEditingDragon] = useState<Dragon | null>(null);

  const handleUpdate = async (formData: { name: string; type: string }) => {
    if (editingDragon) {
      await updateDragon({ id: editingDragon.id, data: formData });
      setEditingDragon(null);
    }
  };

  if (!dragons || dragons.length === 0) return <p>Nenhum dragão à vista.</p>;

  return (
    <>
      <Modal
        isOpen={!!editingDragon}
        onClose={() => setEditingDragon(null)}
        title={`Editando: ${editingDragon?.name}`}
      >
        {editingDragon && (
          <DragonForm
            initialData={{ name: editingDragon.name, type: editingDragon.type }}
            onSubmit={handleUpdate}
            isLoading={isUpdating}
          />
        )}
      </Modal>

      <DragonList
        dragons={dragons}
        onDeleteDragon={async (id, name) => {
          if (window.confirm(`Banir ${name}?`)) await deleteDragon(id);
        }}
        onEditDragon={(dragon) => setEditingDragon(dragon)}
      />
    </>
  );
};
