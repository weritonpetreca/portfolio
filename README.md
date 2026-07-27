# weriton.dev — Portfólio

Reescrita do portfólio em React + Vite + TypeScript, com arquitetura de dupla
persona (Página Profissional + Witcher Realm). Ver `srs-portfolio-transformacao-v1.0.md`
para a especificação completa do projeto — este README cobre só o dia a dia.

## Rodando localmente

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:5173
```

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Checagem de tipos (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | Serve o conteúdo de `dist/` localmente, para conferir o build antes do deploy |
| `npm run lint` | ESLint |
| `npm run test` | Testes (Vitest) |
| `npm run format` | Formata todo o projeto com Prettier |

## Status

**Fase 0 — Fundação** ✅ concluída: tooling, estrutura de pastas, roteamento,
sistema de design e pipeline de CI/CD.

Próxima etapa: **Fase 1** — conteúdo completo da Página Profissional.
