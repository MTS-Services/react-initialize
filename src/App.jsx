import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import { AppRoutes } from "./routes/routes";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={AppRoutes} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
