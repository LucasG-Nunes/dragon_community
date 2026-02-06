// 🔐 Credenciais de Autenticação (Hardcoded para desafio técnico)

export const AUTH_CREDENTIALS = {
  USERNAME: "treinador",
  PASSWORD: "dragao123",
} as const;

// Storage keys
export const AUTH_STORAGE_KEYS = {
  TOKEN: "@dragon_community:token",
  USER: "@dragon_community:user",
  REFRESH_TOKEN: "@dragon_community:refresh_token",
} as const;

// Token expiration (em milissegundos)
export const TOKEN_EXPIRATION = {
  ACCESS_TOKEN: 60 * 60 * 1000, // 1 hora
  REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 dias
} as const;

// Mensagens de erro
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Usuário ou senha inválidos",
  SESSION_EXPIRED: "Sua sessão expirou. Faça login novamente.",
  UNAUTHORIZED: "Você não tem permissão para acessar esta página",
  NETWORK_ERROR: "Erro de conexão. Tente novamente.",
} as const;

// Rotas públicas (não requerem autenticação)
export const PUBLIC_ROUTES = ["/login", "/"] as const;

// Rota padrão após login
export const DEFAULT_AUTHENTICATED_ROUTE = "/dragons";
