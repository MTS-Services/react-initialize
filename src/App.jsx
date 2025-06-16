import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext/ThemeProvider';
import AuthProvider from './context/AuthContext/AuthProvider';
import { RouterProvider } from 'react-router';
import { AppRoutes } from './routes/routes';
import './i18n';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={AppRoutes} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
