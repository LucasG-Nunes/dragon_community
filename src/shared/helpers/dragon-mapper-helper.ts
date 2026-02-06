import { DRAGON_TYPE_MAP } from "../constants/dragon.constants";

export const getDragonTypeData = (type: string) => {
  return (
    DRAGON_TYPE_MAP[type as keyof typeof DRAGON_TYPE_MAP] || {
      icon: "🐲",
      color: "#a0aec0",
      label: type,
    }
  );
};
