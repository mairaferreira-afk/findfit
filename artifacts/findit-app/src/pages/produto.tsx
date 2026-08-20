import { useCallback } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@workspace/findfit-ds/components/ui/button';
import { cn } from '@workspace/findfit-ds/lib/utils';
import {
  useGetProduct,
  useCreateFavorite,
  useDeleteFavorite,
  getGetProductQueryKey,
  getGetFavoritesQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Heart, ChevronRight } from 'lucide-react';

export default function ProdutoPage() {
  const params = useParams<{ productId: string }>();
  const [, setLocation] = useLocation();
  const productId = Number(params.productId);
  const queryClient = useQueryClient();

  const { data: product, isLoading, isError, refetch } = useGetProduct(productId, {
    query: { queryKey: getGetProductQueryKey(productId), enabled: !!productId },
  });

  const createFavorite = useCreateFavorite();
  const deleteFavorite = useDeleteFavorite();

  const handleFavoriteToggle = useCallback(() => {
    if (!product) return;
    if (product.isFavorited) {
      deleteFavorite.mutate(
        { favoriteId: product.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetFavoritesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetProductQueryKey(productId) });
          },
        }
      );
    } else {
      createFavorite.mutate(
        { data: { productId: product.id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetFavoritesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetProductQueryKey(productId) });
          },
        }
      );
    }
  }, [product, createFavorite, deleteFavorite, queryClient, productId]);

  const handleOpenStore = useCallback(() => {
    if (product?.storeUrl) {
      window.open(product.storeUrl, '_blank', 'noopener,noreferrer');
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <div className="w-full bg-muted animate-pulse" style={{ height: 480 }} />
        <div className="px-5 pt-6 space-y-3">
          <div className="h-4 bg-muted animate-pulse w-3/4" />
          <div className="h-3 bg-muted animate-pulse w-1/2" />
          <div className="h-8 bg-muted animate-pulse w-1/3 mt-4" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-5" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <p style={{ fontSize: 14, color: '#9A938D' }}>Peça não encontrada</p>
        <Button className="mt-4" variant="outline" onClick={() => refetch()} data-testid="btn-retry">
          Tentar novamente
        </Button>
        <Button className="mt-2" variant="outline" onClick={() => setLocation('/')} data-testid="btn-back-home">
          Voltar ao início
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white pb-28" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Image with overlay nav */}
      <div className="relative" style={{ height: 480, background: '#F5F2EF' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-top"
          data-testid="img-product-detail"
        />
        {/* Overlay nav */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between"
          style={{ padding: '28px 20px 0' }}
        >
          <button
            className="flex items-center justify-center"
            style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.15)' }}
            onClick={() => setLocation('/')}
            data-testid="btn-back"
            aria-label="Voltar"
          >
            <ArrowLeft size={18} strokeWidth={1.25} style={{ color: 'white' }} />
          </button>
          <button
            className="flex items-center justify-center"
            style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.15)' }}
            onClick={handleFavoriteToggle}
            data-testid="btn-favorite-detail"
            aria-label={product.isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              size={17}
              strokeWidth={1.25}
              style={{ color: 'white' }}
              className={cn(product.isFavorited ? 'fill-white' : '')}
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mx-auto px-5 pt-6" style={{ maxWidth: 430 }}>
        {/* Store + collection */}
        <div className="flex items-center gap-2 mb-3">
          <span className="lowercase" style={{ fontSize: 11, color: '#9A938D' }} data-testid="text-store-name">
            {product.storeName}
          </span>
          {product.storeCollection && (
            <>
              <span style={{ color: '#D9D4CF', fontSize: 11 }}>·</span>
              <span className="lowercase" style={{ fontSize: 11, color: '#9A938D' }}>
                {product.storeCollection}
              </span>
            </>
          )}
          {product.storeType && (
            <span
              className="ml-auto"
              style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C9B6A1' }}
            >
              {product.storeType}
            </span>
          )}
        </div>

        {/* Name */}
        <h1
          className="font-medium lowercase"
          style={{ fontSize: 20, letterSpacing: '-0.04em', color: '#171614', lineHeight: 1.25 }}
          data-testid="text-product-name"
        >
          {product.name}
        </h1>

        {/* Price */}
        <p
          className="font-medium mt-3"
          style={{ fontSize: 26, letterSpacing: '-0.05em', color: '#171614' }}
          data-testid="text-product-price"
        >
          {product.priceFormatted ?? `R$ ${product.price.toFixed(2)}`}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: '#E7E2DE' }} className="my-6" />

        {/* Details */}
        <div className="space-y-3">
          {product.color && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: '#9A938D' }}>cor</span>
              <span className="lowercase" style={{ fontSize: 12, color: '#171614', fontWeight: 500 }} data-testid="text-color">
                {product.color}
              </span>
            </div>
          )}
          {product.material && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: '#9A938D' }}>material</span>
              <span className="lowercase" style={{ fontSize: 12, color: '#171614', fontWeight: 500 }} data-testid="text-material">
                {product.material}
              </span>
            </div>
          )}
          {product.composition && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: '#9A938D' }}>composição</span>
              <span className="lowercase" style={{ fontSize: 12, color: '#171614', fontWeight: 500 }} data-testid="text-composition">
                {product.composition}
              </span>
            </div>
          )}
          {product.shipping && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: '#9A938D' }}>envio</span>
              <span style={{ fontSize: 12, color: '#171614', fontWeight: 500 }} data-testid="text-shipping">
                {product.shipping}
              </span>
            </div>
          )}
          {product.category && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: '#9A938D' }}>categoria</span>
              <span className="lowercase" style={{ fontSize: 12, color: '#171614', fontWeight: 500 }}>
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Similar pieces */}
        {product.similar && product.similar.length > 0 && (
          <div className="mt-8">
            <div style={{ height: 1, background: '#E7E2DE' }} className="mb-6" />
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 13, fontWeight: 500, color: '#171614' }}>peças similares</h2>
              <button
                className="flex items-center gap-1"
                style={{ fontSize: 11, color: '#9A938D' }}
                data-testid="btn-ver-todas-similares"
              >
                ver todas
                <ChevronRight size={14} strokeWidth={1.2} />
              </button>
            </div>
            <div
              className="flex gap-3 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none' }}
              data-testid="scroll-similares"
            >
              {product.similar.map((sim) => (
                <div
                  key={sim.id}
                  className="flex-none cursor-pointer"
                  style={{ width: 140 }}
                  onClick={() => setLocation(`/produto/${sim.id}`)}
                  data-testid={`card-similar-${sim.id}`}
                >
                  <div style={{ height: 180, background: '#F5F2EF' }}>
                    <img
                      src={sim.imageUrl}
                      alt={sim.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="mt-2 lowercase truncate" style={{ fontSize: 11, color: '#171614', fontWeight: 500 }}>
                    {sim.name}
                  </p>
                  <p style={{ fontSize: 10, color: '#9A938D' }}>
                    {sim.priceFormatted ?? `R$ ${sim.price.toFixed(2)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-5 py-4">
        <Button
          className="w-full flex items-center justify-center gap-2"
          style={{ height: 56, fontSize: 13, fontWeight: 500 }}
          onClick={handleOpenStore}
          disabled={!product.storeUrl}
          data-testid="btn-ver-na-loja"
        >
          Ver na loja
          <ExternalLink size={14} strokeWidth={1.25} />
        </Button>
      </div>
    </div>
  );
}
