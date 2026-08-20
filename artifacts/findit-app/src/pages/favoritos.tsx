import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@workspace/findfit-ds/components/ui/button';
import {
  useGetFavorites,
  useDeleteFavorite,
  getGetFavoritesQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Heart, Sparkles } from 'lucide-react';

function FavoriteSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-muted animate-pulse" style={{ height: 224 }} />
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-muted animate-pulse w-3/4" />
        <div className="h-2 bg-muted animate-pulse w-1/2" />
      </div>
    </div>
  );
}

export default function FavoritosPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: favorites, isLoading, isError, refetch } = useGetFavorites();
  const deleteFavorite = useDeleteFavorite();

  const handleRemove = useCallback((favoriteId: number) => {
    deleteFavorite.mutate(
      { favoriteId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetFavoritesQueryKey() });
        },
      }
    );
  }, [deleteFavorite, queryClient]);

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
        <div style={{ width: 20 }} />
      </header>

      <div className="mx-auto px-5 pb-24" style={{ maxWidth: 430 }}>
        <div className="mt-7 mb-6">
          <h1
            className="font-medium"
            style={{ fontSize: 20, letterSpacing: '-0.04em', color: '#171614' }}
          >
            peças salvas
          </h1>
          {!isLoading && favorites && (
            <p className="mt-1" style={{ fontSize: 13, color: '#9A938D' }} data-testid="text-favorites-count">
              {favorites.length} {favorites.length === 1 ? 'peça' : 'peças'}
            </p>
          )}
        </div>

        <div style={{ height: 1, background: '#E7E2DE' }} className="mb-6" />

        {isError && (
          <div className="text-center py-16">
            <p style={{ fontSize: 14, color: '#9A938D' }}>Erro ao carregar favoritos</p>
            <Button className="mt-4" variant="outline" onClick={() => refetch()} data-testid="btn-retry">
              Tentar novamente
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7">
            {Array.from({ length: 4 }).map((_, i) => <FavoriteSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && !isError && (!favorites || favorites.length === 0) && (
          <div className="text-center py-16">
            <div
              className="flex items-center justify-center rounded-full mx-auto mb-4"
              style={{ width: 48, height: 48, border: '1px solid #D7D1CA' }}
            >
              <Heart size={20} strokeWidth={1.25} style={{ color: '#9A938D' }} />
            </div>
            <p style={{ fontSize: 14, color: '#171614', fontWeight: 500 }}>Nenhuma peça salva</p>
            <p className="mt-2" style={{ fontSize: 13, color: '#9A938D' }}>
              Salve peças que você encontrou para ver depois
            </p>
            <Button
              className="mt-6 flex items-center gap-2 mx-auto"
              style={{ height: 48, fontSize: 13, fontWeight: 500 }}
              onClick={() => setLocation('/')}
              data-testid="btn-start-searching"
            >
              <Sparkles size={14} strokeWidth={1.35} />
              Começar a buscar
            </Button>
          </div>
        )}

        {!isLoading && !isError && favorites && favorites.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7" data-testid="grid-favorites">
            {favorites.map((fav) => {
              const product = fav.product;
              if (!product) return null;
              return (
                <div key={fav.id} className="flex flex-col" data-testid={`card-favorite-${fav.id}`}>
                  <div
                    className="relative cursor-pointer"
                    style={{ height: 224, background: '#F5F2EF' }}
                    onClick={() => setLocation(`/produto/${product.id}`)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                      data-testid={`img-favorite-${fav.id}`}
                    />
                    <button
                      className="absolute top-3 right-3 flex items-center justify-center"
                      style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.85)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(fav.id);
                      }}
                      data-testid={`btn-remove-favorite-${fav.id}`}
                      aria-label="Remover dos favoritos"
                    >
                      <Heart size={16} strokeWidth={1.25} className="fill-current text-foreground" />
                    </button>
                  </div>
                  <div
                    className="mt-3 flex items-start justify-between gap-1 cursor-pointer"
                    onClick={() => setLocation(`/produto/${product.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium lowercase truncate"
                        style={{ color: '#171614', letterSpacing: '-0.01em' }}
                        data-testid={`text-name-${fav.id}`}
                      >
                        {product.name}
                      </p>
                      <p className="mt-1 lowercase truncate" style={{ fontSize: 10, color: '#9A938D' }}>
                        {product.storeName}
                      </p>
                    </div>
                    <p
                      className="font-medium shrink-0"
                      style={{ color: '#171614', fontSize: 11 }}
                      data-testid={`text-price-${fav.id}`}
                    >
                      {product.priceFormatted ?? `R$ ${product.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-white" style={{ height: 56 }}>
        <button onClick={() => setLocation('/')} className="flex flex-col items-center gap-1" style={{ fontSize: 10, color: '#9A938D' }} data-testid="nav-home">
          início
        </button>
        <button onClick={() => setLocation('/lojas')} className="flex flex-col items-center gap-1" style={{ fontSize: 10, color: '#9A938D' }} data-testid="nav-lojas">
          lojas
        </button>
        <button className="flex flex-col items-center gap-1" style={{ fontSize: 10, color: '#171614' }} data-testid="nav-favoritos">
          <div style={{ width: 20, height: 2, background: '#171614' }} />
          salvos
        </button>
      </nav>
    </div>
  );
}
