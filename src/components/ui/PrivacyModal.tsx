import { useEffect } from "react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop com desfoque */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Janela Modal Estilo Forja Medieval */}
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-forge-700/90 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(234,88,12,0.15)] text-bone">
        
        {/* Marcadores decorativos nos cantos */}
        <span className="absolute top-3 left-3 font-mono text-[10px] text-amber-500/40 select-none">᛭</span>
        <span className="absolute top-3 right-3 font-mono text-[10px] text-amber-500/40 select-none">᛭</span>

        {/* Cabeçalho */}
        <div className="flex items-start justify-between border-b border-forge-700/60 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-amber-500">
              <span>🛡️</span>
              <span>Conformidade & Proteção de Dados</span>
            </div>
            <h2 id="privacy-modal-title" className="mt-1 font-display text-xl sm:text-2xl font-bold text-bone">
              Política de Privacidade & LGPD
            </h2>
            <p className="mt-1 font-mono text-xs text-steel">
              Lei Geral de Proteção de Dados (Lei Federal nº 13.709/2018)
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal de privacidade"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-forge-700 bg-forge-900 text-steel hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo Informativo */}
        <div className="mt-6 space-y-5 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <section className="rounded-lg border border-forge-800 bg-forge-900/40 p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span>1.</span> Controlador & Finalidade do Tratamento
            </h3>
            <p>
              Os dados fornecidos voluntariamente no formulário de contato (<strong>Nome</strong>, <strong>E-mail</strong> e <strong>Mensagem</strong>) são tratados pelo titular deste portfólio, <strong>Weriton Luis Petreca</strong>, com a finalidade exclusiva de responder a propostas profissionais, oportunidades de trabalho, contratação de serviços ou networking técnico.
            </p>
            <p className="mt-1 text-[11px] font-mono text-steel">
              Base legal: Art. 7º, inciso V da LGPD (procedimentos preliminares relacionados a contrato a pedido do titular).
            </p>
          </section>

          <section className="rounded-lg border border-forge-800 bg-forge-900/40 p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span>2.</span> Segurança, Armazenamento & Nuvem
            </h3>
            <p>
              A transmissão é protegida por criptografia ponta a ponta (<strong>HTTPS / TLS 1.3</strong>). O processamento ocorre através de arquitetura Serverless na <strong>Amazon Web Services (AWS)</strong> via AWS Lambda e Amazon SES, entregando a mensagem diretamente na caixa de entrada corporativa do responsável. Não há armazenamento desses dados em bancos de dados de leads comerciais.
            </p>
          </section>

          <section className="rounded-lg border border-forge-800 bg-forge-900/40 p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span>3.</span> Proteção Cibernética & Anti-Bot
            </h3>
            <p>
              Utilizamos a tecnologia <strong>Cloudflare Turnstile</strong> para mitigação de spam e proteção contra ataques automatizados (DoS/DDoS). A validação analisa assinaturas de segurança para verificar se o remetente é humano, operando sob legítimo interesse de segurança da informação (Art. 7º, inciso IX da LGPD).
            </p>
          </section>

          <section className="rounded-lg border border-forge-800 bg-forge-900/40 p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span>4.</span> Ausência de Rastreamento Invasivo
            </h3>
            <p>
              Este site <strong>não utiliza cookies de rastreamento de terceiros</strong>, pixels publicitários (Meta/Google Ads) ou ferramentas de perfilamento comercial. Nenhum dado é vendido, repassado ou utilizado para campanhas de marketing não autorizadas.
            </p>
          </section>

          <section className="rounded-lg border border-forge-800 bg-forge-900/40 p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span>5.</span> Direitos do Titular (Art. 18 da LGPD)
            </h3>
            <p>
              Você pode a qualquer momento confirmar a existência do tratamento, solicitar a retificação ou a exclusão definitiva do histórico da sua mensagem respondendo diretamente ao e-mail de retorno ou através do LinkedIn (<a href="https://linkedin.com/in/weriton-petreca" target="_blank" rel="noreferrer" className="text-amber-400 underline">linkedin.com/in/weriton-petreca</a>).
            </p>
          </section>

        </div>

        {/* Rodapé do Modal */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-forge-700/60 pt-4 font-mono text-xs">
          <span className="text-steel/70 text-[11px]">
            Atualizado em Setembro de 2026 · Poços de Caldas, MG
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto cursor-pointer rounded-md bg-ember px-5 py-2 font-bold uppercase tracking-wider text-bone hover:bg-ember-soft transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
