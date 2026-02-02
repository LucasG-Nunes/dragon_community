import { BrowserRouter, Route, Routes } from "react-router-dom";

import DragonCreate from "../../presentation/pages/DragonCreate/DragonCreate";
import DragonDetail from "../../presentation/pages/DragonDetail/DragonDetail";
import { DragonListPage } from "../../presentation/pages/DragonListPage/DragonListPage";
import Login from "../../presentation/pages/Login/Login";
import { NotFound } from "../../presentation/pages/NotFound/NotFound";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login */}
        <Route path="/" element={<Login />} />

        {/* Listagem de Dragões */}
        <Route path="/dragons" element={<DragonListPage />} />

        {/* Criação de Dragão */}
        <Route path="/create-dragon" element={<DragonCreate />} />

        {/* Detalhe do Dragão (useParams usará o 'id') */}
        <Route path="/dragon/:id" element={<DragonDetail />} />

        {/* Rota de Erro 404 - Sempre a última do array */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
