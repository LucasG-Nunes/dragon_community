# 🐉 Dragon Community - Arquitetura Limpa & Escalável

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura Limpa - Conceitos](#-arquitetura-limpa---conceitos)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Camadas da Aplicação](#-camadas-da-aplicação)
- [Atomic Design](#-atomic-design)
- [Fluxo de Dados](#-fluxo-de-dados)
- [Portas e Adaptadores](#-portas-e-adaptadores)
- [Convenções e Boas Práticas](#-convenções-e-boas-práticas)
- [Exemplos Práticos](#-exemplos-práticos)

---

## 🎯 Visão Geral

Este projeto implementa uma arquitetura **Limpa (Clean Architecture)** combinada com **Atomic Design** para criar uma aplicação React altamente escalável, testável e manutenível.

### Tecnologias Principais

- ⚛️ **React 19+** com TypeScript
- ⚡ **Vite** - Build tool ultrarrápido
- 🎨 **SASS** - Estilização avançada
- 🔄 **Axios** - Cliente HTTP
- 🛣️ **React Router** - Roteamento
- 🏗️ **Clean Architecture** - Arquitetura de software

### Princípios Fundamentais

1. **Separação de Responsabilidades** - Cada camada tem um propósito específico
2. **Independência de Frameworks** - Regras de negócio não dependem de bibliotecas externas
3. **Testabilidade** - Facilita testes unitários e de integração
4. **Inversão de Dependências** - Camadas externas dependem das internas, nunca o contrário

---

## 🏛️ Arquitetura Limpa - Conceitos

### O que é Clean Architecture?

A **Arquitetura Limpa** (Clean Architecture) é um padrão criado por Robert C. Martin (Uncle Bob) que organiza o código em camadas concêntricas, onde:

- **Camadas internas** contêm regras de negócio
- **Camadas externas** contêm detalhes de implementação (UI, banco de dados, APIs)
- **Dependências fluem sempre de fora para dentro**

```
┌─────────────────────────────────────────────┐
│         PRESENTATION (UI Layer)             │
│   Components, Pages, Hooks                  │
│   ↓ Depende de ↓                            │
├─────────────────────────────────────────────┤
│      INFRASTRUCTURE (Adapters)              │
│   Services, HTTP, Storage                   │
│   ↓ Depende de ↓                            │
├─────────────────────────────────────────────┤
│         CORE (Business Logic)               │
│   Entities, UseCases, Ports                 │
│   ⚠️ NÃO DEPENDE DE NADA EXTERNO            │
└─────────────────────────────────────────────┘
```

### Por que usar Clean Architecture?

✅ **Manutenibilidade** - Fácil localizar e modificar código  
✅ **Escalabilidade** - Adicionar features sem quebrar o existente  
✅ **Testabilidade** - Testar lógica de negócio isoladamente  
✅ **Flexibilidade** - Trocar frameworks/bibliotecas sem reescrever tudo  
✅ **Colaboração** - Times trabalham em camadas diferentes simultaneamente  

---

## 📁 Estrutura de Pastas

```
src/
├── 📁 app/                      # Configuração Global da Aplicação
│   ├── providers/               # Context Providers (Auth, Theme, etc)
│   ├── routes/                  # Configuração de rotas
│   ├── App.tsx                  # Componente raiz
│   └── App.scss                  # Estilos globais do app
│
├── 📁 assets/                   # Recursos Estáticos
│   └── react.svg                # Imagens, ícones, fontes
│
├── 📁 core/                     # ⚡ NÚCLEO - Regras de Negócio
│   ├── entities/                # Modelos de domínio (User, Dragon, etc)
│   ├── ports/                   # Interfaces (Contratos)
│   │   ├── in/                  # Portas de Entrada (UI → Core)
│   │   └── out/                 # Portas de Saída (Core → Infra)
│   ├── types/                   # Types e Interfaces compartilhados
│   └── useCases/                # Casos de Uso (Lógica de Negócio)
│       ├── auth/                # Casos de uso de autenticação
│       └── dragons/             # Casos de uso de dragões
│
├── 📁 infrastructure/           # 🔌 Adaptadores Externos
│   ├── http/                    # Configuração HTTP (Axios)
│   ├── mappers/                 # Transformação DTO ↔ Entity
│   ├── services/                # Implementação dos Services
│   └── storage/                 # LocalStorage, SessionStorage
│
├── 📁 presentation/             # 🎨 Interface do Usuário
│   ├── components/              # Atomic Design
│   │   ├── atoms/               # Componentes básicos
│   │   ├── molecules/           # Combinação de átomos
│   │   ├── organisms/           # Combinação de moléculas
│   │   └── templates/           # Layouts de página
│   ├── hooks/                   # Custom Hooks
│   └── pages/                   # Páginas completas
│
└── 📁 shared/                   # Utilitários Compartilhados
    ├── constants/               # Constantes da aplicação
    ├── helpers/                 # Funções utilitárias
    ├── styles/                  # SASS global
    └── validators/              # Validações
```

---

## 🎯 Camadas da Aplicação

### 1️⃣ CORE (Núcleo da Aplicação)

**Localização:** `src/core/`

**Responsabilidade:** Contém as **regras de negócio** puras, independentes de qualquer framework.

#### 📦 core/entities/
**O que são:** Modelos de domínio que representam conceitos do negócio.

```typescript
// core/entities/Dragon.ts
export class Dragon {
  constructor(
    public id: string,
    public name: string,
    public type: 'fire' | 'ice' | 'water',
    public level: number,
    public createdAt: Date
  ) {}

  // Regras de negócio ficam aqui
  canEvolve(): boolean {
    return this.level >= 10;
  }

  evolve(): void {
    if (!this.canEvolve()) {
      throw new Error('Dragon level too low to evolve');
    }
    this.level += 1;
  }
}
```

**Por que aqui?**
- Entidades são **independentes** de UI, banco de dados, APIs
- Contêm **comportamentos** do domínio
- Fáceis de testar (sem dependências externas)

#### 🔌 core/ports/
**O que são:** Interfaces que definem contratos entre camadas.

```typescript
// core/ports/out/IDragonRepository.ts
import { Dragon } from '@/core/entities/Dragon';

export interface IDragonRepository {
  findAll(): Promise<Dragon[]>;
  findById(id: string): Promise<Dragon | null>;
  create(dragon: Dragon): Promise<Dragon>;
  update(dragon: Dragon): Promise<Dragon>;
  delete(id: string): Promise<void>;
}
```

**Por que aqui?**
- Define **O QUE** precisa ser feito (não **COMO**)
- Core não conhece detalhes de implementação (HTTP, LocalStorage, etc)
- Facilita **testes** com mocks

**Divisão:**
- **ports/in/** - Interfaces que a UI chama (exemplo: `ILoginUseCase`)
- **ports/out/** - Interfaces que o Core precisa (exemplo: `IAuthService`)

#### ⚙️ core/useCases/
**O que são:** Orquestração da lógica de negócio (casos de uso específicos).

```typescript
// core/useCases/auth/LoginUseCase.ts
import { IAuthService } from '@/core/ports/out/IAuthService';
import { User } from '@/core/entities/User';

export class LoginUseCase {
  constructor(private authService: IAuthService) {}

  async execute(email: string, password: string): Promise<User> {
    // Validações de negócio
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Delegar para o serviço (porta de saída)
    const user = await this.authService.login(email, password);

    // Regras de negócio adicionais
    if (!user.isActive) {
      throw new Error('User account is inactive');
    }

    return user;
  }
}
```

**Por que aqui?**
- **Orquestra** a lógica de negócio
- Usa **portas** para se comunicar com infraestrutura
- Um caso de uso = uma funcionalidade específica
- Facilita entender **o que a aplicação faz**

#### 📝 core/types/
**O que são:** Types/Interfaces compartilhados entre camadas.

```typescript
// core/types/common.ts
export type ID = string;

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
```

**Por que aqui?**
- Tipos **reutilizáveis**
- Evita duplicação
- Documentação viva do sistema

---

### 2️⃣ INFRASTRUCTURE (Infraestrutura)

**Localização:** `src/infrastructure/`

**Responsabilidade:** Implementa as **portas de saída** definidas no Core.

#### 🌐 infrastructure/http/
**O que é:** Configuração do cliente HTTP (Axios).

```typescript
// infrastructure/http/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Por que aqui?**
- Centraliza configuração HTTP
- Adiciona interceptors (auth, logging, etc)
- **Não contém lógica de negócio**

#### 🔧 infrastructure/services/
**O que são:** Implementações concretas das interfaces de porta.

```typescript
// infrastructure/services/AuthService.ts
import { IAuthService } from '@/core/ports/out/IAuthService';
import { User } from '@/core/entities/User';
import { api } from '@/infrastructure/http/api';
import { UserMapper } from '@/infrastructure/mappers/UserMapper';

export class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<User> {
    const response = await api.post('/auth/login', { email, password });
    
    // DTO → Entity (usando mapper)
    return UserMapper.toDomain(response.data);
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  }
}
```

**Por que aqui?**
- **Implementa** as interfaces definidas no Core
- Lida com detalhes técnicos (HTTP, storage, etc)
- Pode ser substituída sem afetar o Core

#### 🔄 infrastructure/mappers/
**O que são:** Transformam dados entre camadas (DTO ↔ Entity).

```typescript
// infrastructure/mappers/UserMapper.ts
import { User } from '@/core/entities/User';

interface UserDTO {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export class UserMapper {
  // DTO da API → Entidade do domínio
  static toDomain(dto: UserDTO): User {
    return new User(
      dto.id.toString(),
      dto.email,
      dto.name,
      dto.is_active,
      new Date(dto.created_at)
    );
  }

  // Entidade → DTO para API
  static toDTO(user: User): UserDTO {
    return {
      id: parseInt(user.id),
      email: user.email,
      name: user.name,
      is_active: user.isActive,
      created_at: user.createdAt.toISOString(),
    };
  }
}
```

**Por que aqui?**
- Isola formato da API (snake_case) do domínio (camelCase)
- Se a API mudar, só ajusta o mapper
- Mantém entidades **puras**

#### 💾 infrastructure/storage/
**O que é:** Adaptadores para LocalStorage, SessionStorage, etc.

```typescript
// infrastructure/storage/LocalStorageAdapter.ts
export class LocalStorageAdapter {
  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}
```

**Por que aqui?**
- Abstrai detalhes de armazenamento
- Facilita troca (localStorage → IndexedDB, etc)
- Facilita testes (mock do storage)

---

### 3️⃣ PRESENTATION (Apresentação)

**Localização:** `src/presentation/`

**Responsabilidade:** Interface do usuário (UI) e interação com o usuário.

#### 🎨 presentation/components/ (Atomic Design)

##### ⚛️ atoms/
**O que são:** Componentes **mais básicos** e indivisíveis.

```typescript
// presentation/components/atoms/Button/Button.tsx
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled 
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

**Exemplos de Atoms:**
- Button
- Input
- Label
- Icon
- Avatar
- Badge

**Por que aqui?**
- Componentes **reutilizáveis** em toda aplicação
- Sem lógica de negócio
- Puros e testáveis

##### 🧬 molecules/
**O que são:** Combinação de **2+ átomos** formando um componente funcional.

```typescript
// presentation/components/molecules/SearchBar/SearchBar.tsx
import { Input } from '@/presentation/components/atoms/Input';
import { Button } from '@/presentation/components/atoms/Button';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [term, setTerm] = useState('');

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className={styles.searchBar}>
      <Input 
        placeholder="Search dragons..." 
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};
```

**Exemplos de Molecules:**
- SearchBar (Input + Button)
- FormField (Label + Input + ErrorMessage)
- CardHeader (Avatar + Title + Subtitle)

**Por que aqui?**
- Agrupa átomos relacionados
- Encapsula pequena lógica de UI
- Reutilizável em diferentes contextos

##### 🦠 organisms/
**O que são:** Componentes **complexos** formados por moléculas/átomos.

```typescript
// presentation/components/organisms/Header/Header.tsx
import { SearchBar } from '@/presentation/components/molecules/SearchBar';
import { Logo } from '@/presentation/components/atoms/Logo';
import { UserMenu } from '@/presentation/components/molecules/UserMenu';
import styles from './Header.module.scss';

export const Header = () => {
  const handleSearch = (term: string) => {
    // Lógica de busca
  };

  return (
    <header className={styles.header}>
      <Logo />
      <SearchBar onSearch={handleSearch} />
      <UserMenu />
    </header>
  );
};
```

**Exemplos de Organisms:**
- Header (Logo + SearchBar + UserMenu)
- DragonCard (imagem, título, descrição, ações)
- LoginForm (inputs, botões, validação)

**Por que aqui?**
- Seções **distintas** da interface
- Podem ter lógica de UI complexa
- Geralmente específicos do domínio

##### 📐 templates/
**O que são:** Layouts que definem **estrutura** das páginas.

```typescript
// presentation/components/templates/AuthLayout/AuthLayout.tsx
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.leftPanel}>
        <img src="/dragon-illustration.svg" alt="Dragon" />
      </div>
      <div className={styles.rightPanel}>
        {children}
      </div>
    </div>
  );
};
```

**Exemplos de Templates:**
- AuthLayout (Login/Register)
- DashboardLayout (Sidebar + Content)
- LandingPageLayout

**Por que aqui?**
- Define **estrutura visual**
- Reutilizado por várias páginas
- Sem conteúdo específico

#### 📄 presentation/pages/
**O que são:** Páginas completas, instâncias de templates com conteúdo.

```typescript
// presentation/pages/Login/Login.tsx
import { AuthLayout } from '@/presentation/components/templates/AuthLayout';
import { LoginForm } from '@/presentation/components/organisms/LoginForm';
import { useAuth } from '@/presentation/hooks/useAuth';

export const Login = () => {
  const { login, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <AuthLayout>
      <h1>Welcome Back</h1>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </AuthLayout>
  );
};
```

**Por que aqui?**
- Representa **rotas** da aplicação
- Conecta UI com lógica (hooks, useCases)
- Composição final dos componentes

#### 🪝 presentation/hooks/
**O que são:** Custom Hooks que conectam UI aos UseCases.

```typescript
// presentation/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUseCase } from '@/core/useCases/auth/LoginUseCase';
import { AuthService } from '@/infrastructure/services/AuthService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Instanciar UseCase com Service
      const authService = new AuthService();
      const loginUseCase = new LoginUseCase(authService);

      // Executar caso de uso
      const user = await loginUseCase.execute(email, password);

      // Navegar após sucesso
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
```

**Por que aqui?**
- **Ponte** entre UI e Core
- Gerencia estado da UI (loading, errors)
- Reutilizável em múltiplos componentes

---

### 4️⃣ APP (Configuração Global)

**Localização:** `src/app/`

**Responsabilidade:** Configuração inicial da aplicação.

#### 🔌 app/providers/
**O que são:** Context Providers globais.

```typescript
// app/providers/AuthProvider.tsx
import { createContext, useState, useContext } from 'react';
import { User } from '@/core/entities/User';

interface AuthContextData {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
```

**Por que aqui?**
- Estado **global** da aplicação
- Providers de tema, i18n, auth
- Configurações que afetam toda a app

#### 🛣️ app/routes/
**O que são:** Configuração de rotas da aplicação.

```typescript
// app/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages/Login';
import { Dashboard } from '@/presentation/pages/Dashboard';
import { PrivateRoute } from './PrivateRoute';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};
```

**Por que aqui?**
- Centraliza **todas as rotas**
- Facilita visualizar estrutura da app
- Gerencia rotas públicas/privadas

---

### 5️⃣ SHARED (Utilitários)

**Localização:** `src/shared/`

**Responsabilidade:** Código compartilhado entre camadas.

#### 📊 shared/constants/
```typescript
// shared/constants/api.constants.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
  },
  DRAGONS: {
    LIST: '/dragons',
    DETAIL: (id: string) => `/dragons/${id}`,
  },
} as const;
```

#### 🛠️ shared/helpers/
```typescript
// shared/helpers/formatters.ts
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
```

#### ✅ shared/validators/
```typescript
// shared/validators/formValidators.ts
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password);
};
```

**Por que aqui?**
- Funções **utilitárias** sem lógica de negócio
- Reutilizáveis em qualquer camada
- Facilita manutenção

---

## 🔄 Fluxo de Dados

### Exemplo Completo: Login de Usuário

```
1. 👤 USER ACTION
   └─ Clica no botão "Login"
         ↓

2. 🎨 PRESENTATION (UI)
   └─ LoginForm (Organism) captura evento
         ↓
   └─ Chama useAuth() hook
         ↓

3. 🪝 HOOK (Ponte UI → Core)
   └─ useAuth.login(email, password)
         ↓
   └─ Instancia LoginUseCase
         ↓

4. ⚙️ CORE (Business Logic)
   └─ LoginUseCase.execute()
         ├─ Valida credenciais
         ├─ Chama IAuthService (porta)
         └─ Aplica regras de negócio
         ↓

5. 🔌 INFRASTRUCTURE (External)
   └─ AuthService.login() (implementa IAuthService)
         ├─ api.post('/auth/login')
         ├─ Recebe resposta (DTO)
         └─ UserMapper.toDomain(dto) → User Entity
         ↓

6. 📊 RESPONSE FLOW (volta)
   └─ User Entity → LoginUseCase → useAuth hook → UI
         ↓

7. ✅ UI UPDATE
   └─ useAuth atualiza estado (user, loading, error)
   └─ Componente re-renderiza
   └─ Navega para /dashboard
```

### Visualização Gráfica

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION                         │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────────┐   │
│  │ Button   │→ │LoginForm │→ │ useAuth() Hook      │   │
│  │ (Atom)   │  │(Organism)│  │ - login()           │   │
│  └──────────┘  └──────────┘  │ - isLoading         │   │
│                               │ - error             │   │
│                               └──────────┬──────────┘   │
└────────────────────────────────────────────┼────────────┘
                                             ↓
┌─────────────────────────────────────────────────────────┐
│                       CORE                              │
│  ┌────────────────────────────────────────────────┐    │
│  │ LoginUseCase                                   │    │
│  │  execute(email, password) {                    │    │
│  │    // 1. Validações                            │    │
│  │    if (!email) throw Error                     │    │
│  │                                                 │    │
│  │    // 2. Chama porta de saída                  │    │
│  │    const user = await authService.login()      │    │
│  │                                                 │    │
│  │    // 3. Regras de negócio                     │    │
│  │    if (!user.isActive) throw Error             │    │
│  │                                                 │    │
│  │    return user                                 │    │
│  │  }                                              │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │ usa                                 │
│  ┌────────────────▼───────────────────────────────┐    │
│  │ IAuthService (Interface - Porta OUT)           │    │
│  │  login(email, password): Promise<User>         │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                                             ↓ implementa
┌─────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ AuthService implements IAuthService            │    │
│  │  async login(email, password) {                │    │
│  │    const response = await api.post(...)        │    │
│  │    return UserMapper.toDomain(response.data)   │    │
│  │  }                                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ api (Axios)                                    │    │
│  │  POST /auth/login                              │    │
│  │  → Backend API                                 │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🚪 Portas e Adaptadores (Hexagonal Architecture)

### Conceito

A arquitetura hexagonal (Ports & Adapters) garante que o **Core** não dependa de detalhes externos.

```
         ┌─────────────────────────────────────┐
         │         EXTERNAL WORLD              │
         │  (UI, HTTP, Database, etc)          │
         └──────────┬──────────────┬───────────┘
                    │              │
         ┌──────────▼──────┐   ┌──▼────────────┐
         │   ADAPTER IN    │   │  ADAPTER OUT  │
         │   (UI/Hook)     │   │  (Service)    │
         └──────────┬──────┘   └──┬────────────┘
                    │              │
         ┌──────────▼──────────────▼───────────┐
         │          PORT IN    PORT OUT        │
         │       (Interface) (Interface)       │
         ├─────────────────────────────────────┤
         │                                     │
         │          CORE (BUSINESS)            │
         │      - Entities                     │
         │      - UseCases                     │
         │      - Business Rules               │
         │                                     │
         └─────────────────────────────────────┘
```

### Portas de Entrada (IN) - Driving Ports

**O que são:** Interfaces que a **UI chama** para executar casos de uso.

**Onde ficam:** `core/ports/in/`

```typescript
// core/ports/in/ILoginUseCase.ts
import { User } from '@/core/entities/User';

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<User>;
}
```

**Adaptadores (IN):**
- Hooks React (`useAuth`)
- Componentes (`LoginForm`)

**Fluxo:** `UI → Adapter (Hook) → Port IN (Interface) → UseCase`

### Portas de Saída (OUT) - Driven Ports

**O que são:** Interfaces que o **Core precisa** para se comunicar com o mundo externo.

**Onde ficam:** `core/ports/out/`

```typescript
// core/ports/out/IAuthService.ts
import { User } from '@/core/entities/User';

export interface IAuthService {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
```

**Adaptadores (OUT):**
- Services (`AuthService`)
- Storage (`LocalStorageAdapter`)
- HTTP Client (`api`)

**Fluxo:** `UseCase → Port OUT (Interface) → Adapter (Service) → External API`

### Por que usar Portas?

✅ **Inversão de Dependências** - Core não depende de frameworks  
✅ **Testabilidade** - Fácil mockar as portas  
✅ **Flexibilidade** - Trocar implementação sem alterar Core  
✅ **Clareza** - Contratos explícitos entre camadas  

---

## 📐 Atomic Design

### Hierarquia Visual

```
┌─────────────────────────────────────────────────────────┐
│                       PAGES                             │
│  (Instância com conteúdo real)                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LoginPage                                        │   │
│  │ ┌────────────────────────────────────────────┐   │   │
│  │ │           TEMPLATE                         │   │   │
│  │ │ (Estrutura/Layout)                         │   │   │
│  │ │ ┌──────────────────────────────────────┐   │   │   │
│  │ │ │        ORGANISM                      │   │   │   │
│  │ │ │ (LoginForm)                          │   │   │   │
│  │ │ │ ┌────────────────────────────────┐   │   │   │   │
│  │ │ │ │     MOLECULE                   │   │   │   │   │
│  │ │ │ │ (FormField)                    │   │   │   │   │
│  │ │ │ │ ┌──────────────────────────┐   │   │   │   │   │
│  │ │ │ │ │     ATOMS                │   │   │   │   │   │
│  │ │ │ │ │ Input, Label, Button     │   │   │   │   │   │
│  │ │ │ │ └──────────────────────────┘   │   │   │   │   │
│  │ │ │ └────────────────────────────────┘   │   │   │   │
│  │ │ └──────────────────────────────────────┘   │   │   │
│  │ └────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Quando usar cada nível?

| Nível | Uso | Exemplo |
|-------|-----|---------|
| **Atom** | Elemento único indivisível | Button, Input, Icon |
| **Molecule** | 2-3 átomos relacionados | SearchBar = Input + Button |
| **Organism** | Seção complexa e autossuficiente | Header = Logo + Nav + Search |
| **Template** | Layout sem conteúdo | AuthLayout, DashboardLayout |
| **Page** | Template + conteúdo + lógica | LoginPage, DashboardPage |

---

## ✅ Convenções e Boas Práticas

### Nomenclatura

```typescript
// ✅ BOM
export class LoginUseCase { }
export interface IAuthService { }
export const Button = () => { }

// ❌ EVITAR
export class login_use_case { }
export interface AuthServiceInterface { }
export const btn = () => { }
```

### Organização de Arquivos

```
ComponentName/
├── ComponentName.tsx           # Lógica do componente
├── ComponentName.module.scss   # Estilos específicos
├── ComponentName.test.tsx      # Testes (opcional)
└── index.ts                    # Barrel export
```

```typescript
// index.ts (Barrel Export)
export { ComponentName } from './ComponentName';
```

### Imports

```typescript
// ✅ BOM - Usar alias
import { Button } from '@/presentation/components/atoms/Button';
import { LoginUseCase } from '@/core/useCases/auth/LoginUseCase';

// ❌ EVITAR - Caminhos relativos longos
import { Button } from '../../../presentation/components/atoms/Button';
```

**Configurar alias no `vite.config.ts`:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Tipagem

```typescript
// ✅ BOM - Tipos explícitos
interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

// ❌ EVITAR - any
const handleSubmit = (data: any) => { }
```

### SASS/SCSS

```scss
// ✅ BOM - Usar CSS Modules
.button {
  background-color: $primary-color;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
  
  &--secondary {
    background-color: $secondary-color;
  }
}

// ❌ EVITAR - Estilos globais em componentes
button {
  background-color: blue;
}
```

---

## 🎓 Exemplos Práticos

### Exemplo 1: Criar uma Feature "Dragons"

#### 1. Criar Entidade

```typescript
// core/entities/Dragon.ts
export class Dragon {
  constructor(
    public id: string,
    public name: string,
    public type: 'fire' | 'ice' | 'water',
    public level: number
  ) {}

  canEvolve(): boolean {
    return this.level >= 10;
  }
}
```

#### 2. Criar Porta de Saída

```typescript
// core/ports/out/IDragonRepository.ts
import { Dragon } from '@/core/entities/Dragon';

export interface IDragonRepository {
  findAll(): Promise<Dragon[]>;
  findById(id: string): Promise<Dragon | null>;
}
```

#### 3. Criar UseCase

```typescript
// core/useCases/dragons/GetDragonsUseCase.ts
import { Dragon } from '@/core/entities/Dragon';
import { IDragonRepository } from '@/core/ports/out/IDragonRepository';

export class GetDragonsUseCase {
  constructor(private dragonRepository: IDragonRepository) {}

  async execute(): Promise<Dragon[]> {
    const dragons = await this.dragonRepository.findAll();
    
    // Regra de negócio: ordenar por level
    return dragons.sort((a, b) => b.level - a.level);
  }
}
```

#### 4. Implementar Service

```typescript
// infrastructure/services/DragonService.ts
import { IDragonRepository } from '@/core/ports/out/IDragonRepository';
import { Dragon } from '@/core/entities/Dragon';
import { api } from '@/infrastructure/http/api';

export class DragonService implements IDragonRepository {
  async findAll(): Promise<Dragon[]> {
    const response = await api.get('/dragons');
    return response.data.map((dto: any) => 
      new Dragon(dto.id, dto.name, dto.type, dto.level)
    );
  }

  async findById(id: string): Promise<Dragon | null> {
    const response = await api.get(`/dragons/${id}`);
    const dto = response.data;
    return new Dragon(dto.id, dto.name, dto.type, dto.level);
  }
}
```

#### 5. Criar Hook

```typescript
// presentation/hooks/useDragons.ts
import { useState, useEffect } from 'react';
import { Dragon } from '@/core/entities/Dragon';
import { GetDragonsUseCase } from '@/core/useCases/dragons/GetDragonsUseCase';
import { DragonService } from '@/infrastructure/services/DragonService';

export const useDragons = () => {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDragons = async () => {
      setIsLoading(true);
      
      const dragonService = new DragonService();
      const useCase = new GetDragonsUseCase(dragonService);
      
      const result = await useCase.execute();
      setDragons(result);
      
      setIsLoading(false);
    };

    fetchDragons();
  }, []);

  return { dragons, isLoading };
};
```

#### 6. Criar Componente

```typescript
// presentation/components/organisms/DragonCard/DragonCard.tsx
import { Dragon } from '@/core/entities/Dragon';
import { Button } from '@/presentation/components/atoms/Button';
import styles from './DragonCard.module.scss';

interface DragonCardProps {
  dragon: Dragon;
}

export const DragonCard = ({ dragon }: DragonCardProps) => {
  return (
    <div className={styles.card}>
      <h3>{dragon.name}</h3>
      <p>Type: {dragon.type}</p>
      <p>Level: {dragon.level}</p>
      {dragon.canEvolve() && (
        <Button variant="primary">Evolve</Button>
      )}
    </div>
  );
};
```

#### 7. Criar Página

```typescript
// presentation/pages/Dragons/Dragons.tsx
import { useDragons } from '@/presentation/hooks/useDragons';
import { DragonCard } from '@/presentation/components/organisms/DragonCard';

export const Dragons = () => {
  const { dragons, isLoading } = useDragons();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Dragons</h1>
      <div className="grid">
        {dragons.map(dragon => (
          <DragonCard key={dragon.id} dragon={dragon} />
        ))}
      </div>
    </div>
  );
};
```

---

## 🎯 Benefícios da Arquitetura

### 1. Manutenibilidade
- Código organizado e fácil de encontrar
- Mudanças localizadas (mudar API não afeta UI)
- Refatoração segura

### 2. Testabilidade
```typescript
// Testar UseCase isoladamente (sem HTTP, sem UI)
describe('LoginUseCase', () => {
  it('should login user successfully', async () => {
    // Mock do service
    const mockAuthService: IAuthService = {
      login: jest.fn().mockResolvedValue(new User(...)),
    };

    const useCase = new LoginUseCase(mockAuthService);
    const user = await useCase.execute('test@test.com', '123456');

    expect(user).toBeDefined();
    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
```

### 3. Escalabilidade
- Adicionar features sem quebrar o existente
- Times trabalham em camadas diferentes
- Fácil onboarding de novos desenvolvedores

### 4. Flexibilidade
- Trocar Axios por Fetch? Só muda o Service
- Trocar React por Vue? Core permanece igual
- Trocar API REST por GraphQL? Só muda Infrastructure

---

## 📚 Referências e Leitura Adicional

### Livros
- **Clean Architecture** - Robert C. Martin
- **Atomic Design** - Brad Frost
- **Domain-Driven Design** - Eric Evans

### Artigos
- [Clean Architecture on Frontend](https://dev.to/bespoyasov/clean-architecture-on-frontend-4311)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

### Padrões Aplicados
- ✅ Clean Architecture (Camadas bem definidas)
- ✅ Hexagonal Architecture (Portas e Adaptadores)
- ✅ Atomic Design (Componentes UI)
- ✅ Dependency Inversion (Interfaces/Contratos)
- ✅ Single Responsibility (Cada classe/função faz uma coisa)
- ✅ Repository Pattern (Abstração de dados)


## 🤝 Contribuindo

Ao adicionar novas features, sempre siga:

1. **Entidades** → Core/entities
2. **Interfaces** → Core/ports
3. **UseCases** → Core/useCases
4. **Services** → Infrastructure/services
5. **Hooks** → Presentation/hooks
6. **Componentes** → Presentation/components (Atomic Design)
7. **Páginas** → Presentation/pages

**Nunca:**
- ❌ Lógica de negócio em componentes
- ❌ Chamadas HTTP diretas em componentes
- ❌ Core importando de Infrastructure ou Presentation

---

## 📝 Conclusão

Esta arquitetura pode parecer **over-engineering** para projetos pequenos, mas em aplicações **médias/grandes** ela:

✅ Reduz bugs  
✅ Acelera desenvolvimento (após setup inicial)  
✅ Facilita manutenção  
✅ Melhora colaboração em equipe  
✅ Aumenta qualidade do código  

**Lembre-se:** Arquitetura é um **investimento**. O esforço inicial compensa em médio/longo prazo.

---

**Desenvolvido seguindo Clean Architecture & Atomic Design por Lucas.**