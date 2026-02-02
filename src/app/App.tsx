import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRoutes } from "./routes/AppRoutes";

import "@/app/App.scss";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
