import { Suspense } from "react";

import { Loader } from "../../components/atoms/Loader/Loader";
import { DragonCollection } from "../../components/organisms/DragonCollection/DragonCollection";
import { Header } from "../../components/organisms/Header/Header";
import { Sidebar } from "../../components/organisms/Sidebar/Sidebar";
import { MainLayoutTemplate } from "../../components/templates/MainLayoutTemplate/MainLayoutTemplate";

export const DragonListPage = () => {
  return (
    <MainLayoutTemplate
      header={<Header title="📜 Registro de Criaturas" />}
      sidebar={<Sidebar />}
    >
      <h2>Dragon Collection</h2>
      <Suspense fallback={<Loader message="Invocando Dragões" />}>
        <DragonCollection />
      </Suspense>
    </MainLayoutTemplate>
  );
};
