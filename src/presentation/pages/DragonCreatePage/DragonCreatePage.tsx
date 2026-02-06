import { useNavigate } from "react-router-dom";

import { DragonForm } from "../../components/organisms/DragonForm/DragonForm";
import { Header } from "../../components/organisms/Header/Header";
import { Sidebar } from "../../components/organisms/Sidebar/Sidebar";
import { MainLayoutTemplate } from "../../components/templates/MainLayoutTemplate/MainLayoutTemplate";
import { useCreateDragon } from "../../hooks/useCreateDragon/useCreateDragon";

export const DragonCreatePage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createDragon, isPending } = useCreateDragon();

  const handleCreate = async (data: { name: string; type: string }) => {
    try {
      await createDragon(data);
      navigate("/dragons");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error");
    }
  };

  return (
    <MainLayoutTemplate
      header={<Header title="🔥 Convocar Nova Criatura" />}
      sidebar={<Sidebar />}
    >
      <DragonForm onSubmit={handleCreate} isLoading={isPending} />
    </MainLayoutTemplate>
  );
};
