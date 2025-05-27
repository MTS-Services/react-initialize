import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { AppRoutes } from "./routes/routes";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRoutes} />
      </QueryClientProvider>
    </>
  );
}

export default App;
