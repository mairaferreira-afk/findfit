import { type ReactNode, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@workspace/findfit-ds/components/ui/toaster';
import { TooltipProvider } from '@workspace/findfit-ds/components/ui/tooltip';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const HomePage = lazy(() => import('@/pages/home'));
const ResultadosPage = lazy(() => import('@/pages/resultados'));
const ProdutoPage = lazy(() => import('@/pages/produto'));
const LojasPage = lazy(() => import('@/pages/lojas'));
const FavoritosPage = lazy(() => import('@/pages/favoritos'));
const NotFound = lazy(() => import('@/pages/not-found'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function PageLoader() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center bg-white"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      <span
        style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.42em', color: '#171614' }}
      >
        findfit
      </span>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/resultados/:searchId" component={ResultadosPage} />
          <Route path="/produto/:productId" component={ProdutoPage} />
          <Route path="/lojas" component={LojasPage} />
          <Route path="/favoritos" component={FavoritosPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
