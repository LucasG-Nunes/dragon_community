import { useState } from "react";

import "./App.scss";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Iniciando a estrutura da aplicação :D</h1>
      <span>Vamos entregar valor!</span>
    </>
  );
};

export default App;
