import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  type LoginFormData,
  loginSchema,
} from "../../../../shared/validators/loginSchema";
import { Input } from "../../atoms/Input/Input";

import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  onSubmit: (credentials: LoginFormData) => void;
  isLoading?: boolean;
  externalError?: string | null;
}

export const LoginForm = ({
  onSubmit,
  isLoading,
  externalError,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const loading = isLoading || isSubmitting;

  return (
    <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
      <h2>Bem-vindo, Treinador! 🛡️</h2>
      <p>Acesse sua conta para gerenciar seus dragões.</p>

      {externalError && (
        <div className={styles.authError} role="alert">
          <span>⚠️</span> {externalError}
        </div>
      )}

      <Input
        label="Usuário"
        placeholder="Seu usuário"
        type="text"
        error={errors.user?.message}
        disabled={loading}
        autoComplete="username"
        {...register("user")}
      />

      <Input
        label="Senha"
        placeholder="••••••••"
        type="password"
        error={errors.pass?.message}
        disabled={loading}
        autoComplete="current-password"
        {...register("pass")}
      />

      <button type="submit" className={styles.loginBtn} disabled={loading}>
        {loading ? "Entrando..." : "Entrar na Caverna"}
      </button>
    </form>
  );
};
