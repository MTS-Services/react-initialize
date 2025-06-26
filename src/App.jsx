import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import { AppRoutes } from "./routes/routes";

import "react-loading-skeleton/dist/skeleton.css";
import AuthProvider from "./context/AuthContext/AuthProvider";
import { FavoriteProvider } from "./context/FavouriteContext/FavouriteProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FavoriteProvider>
              <RouterProvider router={AppRoutes} />
            </FavoriteProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
