import { useState } from "react";

import { GatewaySuspense } from "../../components/molecules/GatewaySuspense/GatewaySuspense";
import { LoginForm } from "../../components/organisms/LoginForm/LoginForm";
import { PublicTemplate } from "../../components/templates/PublicTemplate/PublicTemplate";
import { useAuth } from "../../hooks/useAuth/useAuth";

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();

  const [isGatewayActive, setIsGatewayActive] = useState(true);

  const handleLogin = async (data: { user: string; pass: string }) => {
    await login(data.user, data.pass);
  };

  return (
    <>
      {isGatewayActive && (
        <GatewaySuspense
          onFinished={() => setIsGatewayActive(false)}
          message="Acessando taverna"
        />
      )}

      <PublicTemplate>
        <div
          style={{
            opacity: isGatewayActive ? 0 : 1,
            transition: "opacity 1.5s ease-in-out",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            externalError={error}
          />
        </div>
      </PublicTemplate>
    </>
  );
};
