import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DRAGON_TYPES } from "../../../../shared/constants/dragon.constants";
import { getDragonTypeData } from "../../../../shared/helpers/dragon-mapper-helper";
import {
  type DragonFormData,
  dragonSchema,
} from "../../../../shared/validators/dragonSchema";
import { Input } from "../../atoms/Input/Input";

import styles from "./DragonForm.module.scss";

interface DragonFormProps {
  onSubmit: (data: DragonFormData) => void;
  initialData?: DragonFormData;
  isLoading?: boolean;
}

export const DragonForm = ({
  onSubmit,
  initialData,
  isLoading,
}: DragonFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DragonFormData>({
    resolver: zodResolver(dragonSchema),
    defaultValues: initialData || {
      name: "",
      type: "Fogo",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const loading = isLoading || isSubmitting;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome do Dragão"
        placeholder="Ex: Dracarys"
        type="text"
        error={errors.name?.message}
        disabled={loading}
        helperText="Escolha um nome épico para seu dragão"
        {...register("name")}
      />

      <div className={styles.field}>
        <label htmlFor="type" className={styles.label}>
          Elemento de Origem
        </label>
        <select
          id="type"
          className={`${styles.select} ${errors.type ? styles.selectError : ""}`}
          disabled={loading}
          {...register("type")}
        >
          {DRAGON_TYPES.map((type) => {
            const { icon, label } = getDragonTypeData(type);

            return (
              <option key={type} value={type}>
                {icon} {label}
              </option>
            );
          })}
        </select>

        {errors.type && (
          <span className={styles.error} role="alert">
            {errors.type.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? (
          "Conjurando..."
        ) : (
          <>{initialData ? "Atualizar Registro" : "Invocar Novo Dragão"} 🐉</>
        )}
      </button>
    </form>
  );
};
