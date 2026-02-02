import { Suspense } from "react";

import { DragonCollection } from "../../components/organisms/DragonCollection/DragonCollection";

export const DragonListPage = () => {
  return (
    <main>
      <h1>Comunidade de Dragões</h1>

      {/* O fallback pode ser um Átomo de Spinner ou Skeleton */}
      {/* Decidir como vou controlar o skeleton */}
      <Suspense fallback={<span>Invocando dragões... 🔥</span>}>
        <DragonCollection />
      </Suspense>
    </main>
  );
};
