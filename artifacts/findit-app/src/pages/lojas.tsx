import { useLocation } from 'wouter';
import { Button } from '@workspace/findfit-ds/components/ui/button';
import { useGetNearbyStores } from '@workspace/api-client-react';
import { ChevronLeft, Heart } from 'lucide-react';

function StoreSkeleton() {
  return (
    <div className="py-5 border-b border-border">
      <div className="h-4 bg-muted animate-pulse w-1/2 mb-2" />
      <div className="h-3 bg-muted animate-pulse w-3/4 mb-2" />
      <div className="h-3 bg-muted animate-pulse w-1/3" />
    </div>
  );
}

export default function LojasPage() {
  const [, setLocation] = useLocation();
  const { data: stores, isLoading, isError, refetch } = useGetNearbyStores();

  return (
    <div className="min-h-[100dvh] bg-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-white z-10">
        <button
          onClick={() => setLocation('/')}
          style={{ color: '#171614' }}
          data-testid="btn-back"
        >
          <ChevronLeft size={20} strokeWidth={1.35} />
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.42em', color: '#171614' }}>
          findfit
        </span>
        <button onClick={() => setLocation('/favoritos')} style={{ color: '#9A938D' }} data-testid="link-favoritos">
          <Heart size={16} strokeWidth={1.25} />
        </button>
      </header>

      <div className="mx-auto px-5 pb-12" style={{ maxWidth: 430 }}>
        <div className="mt-7 mb-6">
          <h1
            className="font-medium"
            style={{ fontSize: 20, letterSpacing: '-0.04em', color: '#171614' }}
          >
            lojas próximas
          </h1>
          <p className="mt-1" style={{ fontSize: 13, color: '#9A938D' }}>
            Encontre as peças nas lojas físicas
          </p>
        </div>

        <div style={{ height: 1, background: '#E7E2DE' }} />

        {isError && (
          <div className="text-center py-16">
            <p style={{ fontSize: 14, color: '#9A938D' }}>Erro ao carregar lojas</p>
            <Button className="mt-4" variant="outline" onClick={() => refetch()} data-testid="btn-retry">
              Tentar novamente
            </Button>
          </div>
        )}

        {isLoading && (
          <div>
            {Array.from({ length: 5 }).map((_, i) => <StoreSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && !isError && (!stores || stores.length === 0) && (
          <div className="text-center py-16">
            <p style={{ fontSize: 14, color: '#9A938D' }}>Nenhuma loja encontrada nas proximidades</p>
          </div>
        )}

        {!isLoading && !isError && stores && stores.length > 0 && (
          <div data-testid="list-stores">
            {stores.map((store) => (
              <div
                key={store.id}
                className="py-5 border-b border-border"
                data-testid={`card-store-${store.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium lowercase"
                      style={{ fontSize: 14, color: '#171614', letterSpacing: '-0.01em' }}
                      data-testid={`text-store-name-${store.id}`}
                    >
                      {store.name}
                    </p>
                    {store.type && (
                      <p className="mt-0.5 lowercase" style={{ fontSize: 10, color: '#C9B6A1', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {store.type}
                      </p>
                    )}
                    <p className="mt-2" style={{ fontSize: 12, color: '#9A938D' }} data-testid={`text-store-address-${store.id}`}>
                      {store.address}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    {typeof store.distanceKm === 'number' && (
                      <span
                        style={{ fontSize: 12, color: '#171614', fontWeight: 500 }}
                        data-testid={`text-store-distance-${store.id}`}
                      >
                        {store.distanceKm < 1
                          ? `${Math.round(store.distanceKm * 1000)}m`
                          : `${store.distanceKm.toFixed(1)}km`}
                      </span>
                    )}
                    <span className="mt-1" style={{ fontSize: 11, color: '#9A938D' }} data-testid={`text-store-products-${store.id}`}>
                      {store.productCount} {store.productCount === 1 ? 'peça' : 'peças'}
                    </span>
                  </div>
                </div>
                {store.url && (
                  <button
                    className="mt-3 flex items-center gap-1"
                    style={{ fontSize: 12, color: '#171614', border: '1px solid #D9D4CF', padding: '6px 12px' }}
                    onClick={() => window.open(store.url!, '_blank', 'noopener,noreferrer')}
                    data-testid={`btn-visit-store-${store.id}`}
                  >
                    visitar loja online
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-white" style={{ height: 56 }}>
        <button onClick={() => setLocation('/')} className="flex flex-col items-center gap-1" style={{ fontSize: 10, color: '#9A938D' }} data-testid="nav-home">
          início
        </button>
        <button className="flex flex-col items-center gap-1" style={{ fontSize: 10, color: '#171614' }} data-testid="nav-lojas">
          <div style={{ width: 20, height: 2, background: '#171614' }} />
          lojas
        </button>
        <button onClick={() => setLocation('/favoritos')} className="flex flex-col items-center gap-1" style={{ fontSize: 10, color: '#9A938D' }} data-testid="nav-favoritos">
          <Heart size={16} strokeWidth={1.25} />
          salvos
        </button>
      </nav>
    </div>
  );
}
