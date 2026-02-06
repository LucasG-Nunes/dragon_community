import { NavLink } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth/useAuth";

import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Deseja realmente sair da taverna e abandonar seus dragões?",
    );

    if (confirmLogout) {
      await logout();
    }
  };

  return (
    <aside className={styles.container}>
      <div className={styles.logo}>
        <span className={styles.icon}>🐲</span>
        <h2>Draco Cave</h2>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/dragons"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          📜 Lista de Dragões
        </NavLink>
        <NavLink
          to="/create-dragon"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          🔥 Invocar Novo
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={styles.logoutBtn}
        >
          {isLoading ? "Saindo..." : "🚪 Sair da Taverna"}
        </button>
      </div>
    </aside>
  );
};
