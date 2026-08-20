import { useState, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@workspace/findfit-ds/components/ui/button';
import { cn } from '@workspace/findfit-ds/lib/utils';
import {
  useHealthCheck,
  useCreateSearch,
} from '@workspace/api-client-react';
import { ArrowUp, ImagePlus, Sparkles, Heart, RefreshCw, X } from 'lucide-react';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textQuery, setTextQuery] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: health } = useHealthCheck();
  const createSearch = useCreateSearch();

  const handleFile = useCallback((file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageBase64(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [previewUrl]);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [previewUrl]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSearch = useCallback(() => {
    if (!textQuery.trim() && !imageBase64) return;
    createSearch.mutate(
      { data: { queryText: textQuery || null, imageUrl: imageBase64 || null } },
      { onSuccess: (search) => setLocation(`/resultados/${search.id}`) }
    );
  }, [textQuery, imageBase64, createSearch, setLocation]);

  const hasImage = !!previewUrl;
  const canSearch = !!(textQuery.trim() || imageBase64);

  return (
    <div className="min-h-[100dvh] bg-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <span
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.42em', color: '#171614' }}
            data-testid="text-wordmark"
          >
            findfit
          </span>
          <span style={{ width: 1, height: 14, background: '#C9B6A1', display: 'inline-block' }} />
        </div>
        <nav className="flex items-center gap-5">
          <button
            onClick={() => setLocation('/lojas')}
            style={{ fontSize: 12, color: '#9A938D' }}
            data-testid="link-lojas"
          >
            lojas
          </button>
          <button
            onClick={() => setLocation('/favoritos')}
            style={{ fontSize: 12, color: '#9A938D' }}
            data-testid="link-favoritos"
          >
            <Heart size={16} strokeWidth={1.25} />
          </button>
        </nav>
      </header>

      <main className="mx-auto px-5 pb-16" style={{ maxWidth: 430 }}>
        {/* Hero */}
        <div className="mt-8 mb-7">
          <h1
            className="font-medium"
            style={{ fontSize: 23, letterSpacing: '-0.04em', color: '#171614', lineHeight: 1.2 }}
          >
            Encontre a peça que você viu
          </h1>
          <p className="mt-2" style={{ fontSize: 13, color: '#9A938D' }}>
            Envie uma foto ou descreva a peça
          </p>
        </div>

        {/* ── Image preview state ── */}
        {hasImage ? (
          <div data-testid="preview-container">
            {/* Full-image preview with object-contain */}
            <div
              style={{
                background: '#F5F2EF',
                border: '1px solid #E7E2DE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                maxHeight: 380,
                overflow: 'hidden',
              }}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <img
                src={previewUrl!}
                alt="foto selecionada"
                data-testid="img-preview"
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: 348,
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Discrete actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5"
                  style={{ fontSize: 11, color: '#9A938D' }}
                  data-testid="btn-swap-image"
                >
                  <RefreshCw size={11} strokeWidth={1.4} />
                  trocar imagem
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center gap-1.5"
                  style={{ fontSize: 11, color: '#9A938D' }}
                  data-testid="btn-remove-preview"
                >
                  <X size={11} strokeWidth={1.4} />
                  remover
                </button>
              </div>
              <span style={{ fontSize: 10, color: '#C9B6A1', letterSpacing: '0.04em' }}>
                foto pronta
              </span>
            </div>

            {/* Text refinement (optional, only with image) */}
            <div className="mt-5">
              <input
                type="text"
                placeholder="refinar busca (opcional) — ex: só quero longo e preto"
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none"
                style={{ height: 44, fontSize: 12, border: '1px solid #D9D4CF' }}
                data-testid="input-text-refine"
              />
            </div>
          </div>
        ) : (
          /* ── Upload zone ── */
          <>
            <div
              className={cn('relative flex flex-col items-center justify-center transition-opacity', dragActive && 'opacity-60')}
              style={{
                height: 242,
                background: '#FAF9F7',
                border: `1px dashed ${dragActive ? '#C9B6A1' : '#20201E'}`,
              }}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              data-testid="upload-area"
            >
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{ width: 44, height: 44, border: '1px solid #D7D1CA' }}
              >
                <ArrowUp size={17} strokeWidth={1.25} style={{ color: '#171614' }} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#171614' }}>Enviar foto</p>
              <p className="mt-1" style={{ fontSize: 11, letterSpacing: '0.05em', color: '#8B857E' }}>
                JPG, PNG, WEBP
              </p>
              <button
                className="mt-4 flex items-center gap-2 px-4 py-2"
                style={{ fontSize: 12, color: '#171614', border: '1px solid #D9D4CF' }}
                onClick={() => fileInputRef.current?.click()}
                data-testid="btn-open-gallery"
              >
                <ImagePlus size={16} strokeWidth={1.4} />
                galeria
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div style={{ flex: 1, height: 1, background: '#E7E2DE' }} />
              <span style={{ fontSize: 11, color: '#AAA39C' }}>ou</span>
              <div style={{ flex: 1, height: 1, background: '#E7E2DE' }} />
            </div>

            {/* Text search */}
            <input
              type="text"
              placeholder="Ex: vestido midi acetinado marfim"
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none"
              style={{ height: 48, fontSize: 13, border: '1px solid #D9D4CF' }}
              data-testid="input-text-search"
            />
          </>
        )}

        {/* Hidden file input — always mounted */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
          data-testid="input-file-upload"
        />

        {/* CTA */}
        <Button
          className="w-full mt-4 flex items-center justify-center gap-2"
          style={{ height: 56, fontSize: 13, fontWeight: 500 }}
          onClick={handleSearch}
          disabled={!canSearch || createSearch.isPending}
          data-testid="btn-search"
        >
          {createSearch.isPending ? 'Buscando...' : (
            <>
              <Sparkles size={14} strokeWidth={1.35} />
              {hasImage ? 'Buscar peças similares' : 'Encontrar peças similares'}
            </>
          )}
        </Button>
      </main>

      {/* Bottom Nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-white"
        style={{ height: 56 }}
        data-health={health?.status}
      >
        <button
          onClick={() => setLocation('/')}
          className="flex flex-col items-center gap-1"
          style={{ fontSize: 10, color: '#171614' }}
          data-testid="nav-home"
        >
          <div style={{ width: 20, height: 2, background: '#171614' }} />
          início
        </button>
        <button
          onClick={() => setLocation('/lojas')}
          className="flex flex-col items-center gap-1"
          style={{ fontSize: 10, color: '#9A938D' }}
          data-testid="nav-lojas"
        >
          lojas
        </button>
        <button
          onClick={() => setLocation('/favoritos')}
          className="flex flex-col items-center gap-1"
          style={{ fontSize: 10, color: '#9A938D' }}
          data-testid="nav-favoritos"
        >
          <Heart size={16} strokeWidth={1.25} />
          salvos
        </button>
      </nav>
    </div>
  );
}
