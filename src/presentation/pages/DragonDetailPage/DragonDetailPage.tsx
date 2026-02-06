import { useParams } from "react-router-dom";

import { Loader } from "../../components/atoms/Loader/Loader";
import { DragonCardDetails } from "../../components/organisms/DragonCardDetails/DragonCardDetails"; // Importe o novo organismo
import { Header } from "../../components/organisms/Header/Header";
import { Sidebar } from "../../components/organisms/Sidebar/Sidebar";
import { MainLayoutTemplate } from "../../components/templates/MainLayoutTemplate/MainLayoutTemplate";
import { useDragon } from "../../hooks/useDragon";

export const DragonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: dragon, isLoading } = useDragon(id!);

  return (
    <MainLayoutTemplate
      header={<Header title="📖 Grimório da Criatura" />}
      sidebar={<Sidebar />}
    >
      {isLoading ? (
        <Loader message="Consultando Grimório" />
      ) : dragon ? (
        <DragonCardDetails
          name={dragon.name}
          type={dragon.type}
          createdAt={dragon.createdAt.toLocaleDateString()}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#744210" }}>
          Esta criatura fugiu da caverna ou nunca existiu... 🐉💨
        </p>
      )}
    </MainLayoutTemplate>
  );
};
