import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Dragão não encontrado!</h1>
      <p>Parece que essa caverna está vazia.</p>
      <button onClick={() => navigate("/dragons")}>
        Voltar para a segurança
      </button>
    </div>
  );
};
