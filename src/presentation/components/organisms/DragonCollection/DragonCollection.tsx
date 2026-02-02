import { useDragons } from "../../../hooks/useDragons";
import { DragonList } from "../../molecules/DragonList/DragonList";

export const DragonCollection = () => {
  const { data: dragons } = useDragons();

  if (!dragons || dragons.length === 0) return <p>Nenhum dragão à vista.</p>;

  return <DragonList dragons={dragons} />;
};
