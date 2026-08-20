import { useLocation } from 'wouter';
import { Button } from '@workspace/findfit-ds/components/ui/button';

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center bg-white px-5"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <span
        style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.42em', color: '#171614' }}
      >
        findfit
      </span>
      <div style={{ width: 32, height: 1, background: '#C9B6A1' }} className="my-6" />
      <p
        className="font-medium"
        style={{ fontSize: 20, letterSpacing: '-0.04em', color: '#171614' }}
      >
        página não encontrada
      </p>
      <p className="mt-2" style={{ fontSize: 13, color: '#9A938D' }}>
        O endereço que você acessou não existe
      </p>
      <Button
        className="mt-8"
        style={{ height: 48, fontSize: 13, paddingLeft: 32, paddingRight: 32 }}
        onClick={() => setLocation('/')}
        data-testid="btn-home"
      >
        Voltar ao início
      </Button>
    </div>
  );
}
