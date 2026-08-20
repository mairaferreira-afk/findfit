import { useState, useCallback } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@workspace/findfit-ds/components/ui/button';
import { cn } from '@workspace/findfit-ds/lib/utils';
import {
  useGetSearchResults,
  useGetCategories,
  useCreateFavorite,
  useDeleteFavorite,
  getGetSearchResultsQueryKey,
  getGetFavoritesQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, SlidersHorizontal, ArrowDownUp, Heart } from 'lucide-react';

function ProductCardSkeleton() {
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

const SORT_OPTIONS = [
  { label: 'relevância', value: 'relevance' },
  { label: 'menor preço', value: 'price_asc' },
  { label: 'maior preço', value: 'price_desc' },
];

export default function ResultadosPage() {
  const params = useParams<{ searchId: string }>();
  const [, setLocation] = useLocation();
  const searchId = Number(params.searchId);
  const queryClient = useQueryClient();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const { data: results, isLoading, isError, refetch } = useGetSearchResults(searchId, {
    query: { queryKey: getGetSearchResultsQueryKey(searchId), enabled: !!searchId },
  });
  const { data: categories } = useGetCategories();
  const createFavorite = useCreateFavorite();
  const deleteFavorite = useDeleteFavorite();

  const handleFavoriteToggle = useCallback((productId: number, isFavorited: boolean) => {
    if (isFavorited) {
      deleteFavorite.mutate(
        { favoriteId: productId },
        { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetFavoritesQueryKey() }) }
      );
    } else {
      createFavorite.mutate(
        { data: { productId } },
        { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetFavoritesQueryKey() }) }
      );
    }
  }, [createFavorite, deleteFavorite, queryClient]);

  const filteredProducts = useCallback(() => {
    if (!results?.products) return [];
    let prods = [...results.products];
    if (activeCategory !== 'all') {
      prods = prods.filter((p) => p.category === activeCategory);
    }
    if (sortBy === 'price_asc') prods.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') prods.sort((a, b) => b.price - a.price);
    return prods;
  }, [results?.products, activeCategory, sortBy]);

  const products = filteredProducts();

  return (
    <div className="min-h-[100dvh] bg-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-white z-10">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-1"
          style={{ color: '#171614' }}
          data-testid="btn-back"
        >
          <ChevronLeft size={20} strokeWidth={1.35} />
        </button>
        <span
          style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.42em', color: '#171614' }}
        >
          findfit
        </span>
        <button
          onClick={() => setLocation('/favoritos')}
          style={{ color: '#9A938D' }}
          data-testid="link-favoritos-header"
        >
          <Heart size={16} strokeWidth={1.25} />
        </button>
      </header>

      <div className="mx-auto px-5 pb-12" style={{ maxWidth: 430 }}>
        {/* Results count */}
        <div className="mt-6 mb-4 flex items-center justify-between">
          <h1
            className="font-medium"
            style={{ fontSize: 20, letterSpacing: '-0.04em', color: '#171614' }}
            data-testid="text-results-count"
          >
            {isLoading ? 'buscando...' : `${results?.total ?? 0} peças encontradas`}
          </h1>
          <div className="relative">
            <button
              className="flex items-center gap-1"
              style={{ fontSize: 11, color: '#9A938D' }}
              onClick={() => setShowSortMenu(!showSortMenu)}
              data-testid="btn-sort"
            >
              <ArrowDownUp size={13} strokeWidth={1.3} />
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
            </button>
            {showSortMenu && (
              <div
                className="absolute right-0 top-6 bg-white border border-border z-20 min-w-36"
                data-testid="dropdown-sort"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className="w-full text-left px-4 py-2.5"
                    style={{ fontSize: 12, color: sortBy === opt.value ? '#171614' : '#9A938D', fontWeight: sortBy === opt.value ? 500 : 400 }}
                    onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                    data-testid={`sort-option-${opt.value}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'none' }}
          data-testid="filter-categories"
        >
          <button
            className="shrink-0 px-3 py-1.5"
            style={{
              fontSize: 10,
              border: `1px solid ${activeCategory === 'all' ? '#171614' : '#D9D4CF'}`,
              color: activeCategory === 'all' ? '#171614' : '#77716B',
              fontWeight: activeCategory === 'all' ? 500 : 400,
            }}
            onClick={() => setActiveCategory('all')}
            data-testid="filter-chip-all"
          >
            todas
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              className="shrink-0 px-3 py-1.5"
              style={{
                fontSize: 10,
                border: `1px solid ${activeCategory === cat.value ? '#171614' : '#D9D4CF'}`,
                color: activeCategory === cat.value ? '#171614' : '#77716B',
                fontWeight: activeCategory === cat.value ? 500 : 400,
              }}
              onClick={() => setActiveCategory(cat.value)}
              data-testid={`filter-chip-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E7E2DE' }} className="mb-6" />

        {/* Error */}
        {isError && (
          <div className="text-center py-16">
            <p style={{ fontSize: 14, color: '#9A938D' }}>Erro ao carregar resultados</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => refetch()}
              data-testid="btn-retry"
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="text-center py-16">
            <p style={{ fontSize: 14, color: '#9A938D' }}>Nenhuma peça encontrada</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => setLocation('/')}
              data-testid="btn-new-search"
            >
              Nova busca
            </Button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7" data-testid="grid-results">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col cursor-pointer"
                onClick={() => setLocation(`/produto/${product.id}`)}
                data-testid={`card-product-${product.id}`}
              >
                <div className="relative" style={{ height: 224, background: '#F5F2EF' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                    data-testid={`img-product-${product.id}`}
                  />
                  {product.badgeLabel && (
                    <span
                      className="absolute top-3 left-3"
                      style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C9B6A1' }}
                    >
                      {product.badgeLabel}
                    </span>
                  )}
                  {typeof product.similarity === 'number' && (
                    <span
                      className="absolute bottom-3 left-3"
                      style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C9B6A1' }}
                    >
                      {Math.round(product.similarity * 100)}% similar
                    </span>
                  )}
                  <button
                    className="absolute top-3 right-3 flex items-center justify-center"
                    style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.85)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(product.id, product.isFavorited ?? false);
                    }}
                    data-testid={`btn-favorite-${product.id}`}
                    aria-label={product.isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.25}
                      className={cn(product.isFavorited ? 'fill-current' : '')}
                    />
                  </button>
                </div>
                <div className="mt-3 flex items-start justify-between gap-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium lowercase truncate" style={{ color: '#171614', letterSpacing: '-0.01em' }}>
                      {product.name}
                    </p>
                    <p className="mt-1 lowercase truncate" style={{ fontSize: 10, color: '#9A938D' }}>
                      {product.storeName}
                    </p>
                  </div>
                  <p className="text-xs font-medium shrink-0" style={{ color: '#171614', fontSize: 11 }}>
                    {product.priceFormatted ?? `R$ ${product.price.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-5 py-3">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          style={{ height: 48, fontSize: 13 }}
          onClick={() => setLocation('/')}
          data-testid="btn-new-search-bottom"
        >
          <SlidersHorizontal size={18} strokeWidth={1.3} />
          Nova busca
        </Button>
      </div>
    </div>
  );
}
