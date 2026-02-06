import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DragonCreatePage } from "../../presentation/pages/DragonCreatePage/DragonCreatePage";
import { DragonDetailPage } from "../../presentation/pages/DragonDetailPage/DragonDetailPage";
import { DragonListPage } from "../../presentation/pages/DragonListPage/DragonListPage";
import { LoginPage } from "../../presentation/pages/LoginPage/LoginPage";
import { NotFound } from "../../presentation/pages/NotFound/NotFound";
import { PrivateRoute } from "./guards/PrivateRoute";
import { PublicRoute } from "./guards/PublicRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dragons"
          element={
            <PrivateRoute>
              <DragonListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-dragon"
          element={
            <PrivateRoute>
              <DragonCreatePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/dragon/:id"
          element={
            <PrivateRoute>
              <DragonDetailPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
