import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { FavoriteProvider } from "./context/FavouriteContext/FavouriteProvider";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import AuthProvider from "./context/AuthContext/AuthProvider";
import { AppRoutes } from "./routes/routes";

import "react-loading-skeleton/dist/skeleton.css";

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
