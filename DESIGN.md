# Padrão visual do VestuDiretório

Status: padrão vigente — revisão da equipe de Design e Vera, 2026-08-23.

## Direção

O VestuDiretório deve transmitir curadoria, clareza e confiança para lojistas. A interface é editorial e comercial, com pouca decoração e foco em comparar fornecedores e iniciar contato.

## Tokens obrigatórios

Todos os tokens vivem em `src/styles/globals.css`. As páginas não podem redefinir `:root`, fontes, cores de marca, raios ou sombras localmente.

- Tipografia: `Source Sans 3` para corpo e `Source Serif 4` para títulos.
- Fundo: `--paper`; superfícies: `--surface`; texto: `--ink` e `--ink-soft`.
- Acento: `--coral`; apoio: `--lime`; contato WhatsApp: `--whatsapp`.
- Bordas: `--line`; raio padrão: `--r-sm`; sombra: `--shadow-card`.
- Escala de espaçamento: 4, 8, 12, 16, 24, 32, 48 e 64px.

## Componentes

1. Cards repetidos sempre usam borda, contraste de superfície, espaçamento entre itens e borda superior de destaque.
2. CTAs de WhatsApp usam exclusivamente `--whatsapp`; CTAs principais usam `--coral`.
3. Informações comparáveis ficam em blocos próprios, não em texto corrido.
4. Conteúdo inserido por JavaScript usa classes com regras globais documentadas, pois não recebe o escopo automático do Astro.
5. Listas narrativas podem permanecer sem caixas quando a sequência for mais importante que a comparação.

## Navegação

- O header mantém somente uma ação de descoberta: `Encontrar fornecedor`.
- `Para fornecedores` é a única entrada comercial específica.
- Não duplicar `Explorar` com o CTA principal.
- Não criar links de navegação para seções sem conteúdo ou finalidade comprovada.

## Gate antes de publicar

- Não existe `:global(:root)` nem outra redefinição de tokens em páginas.
- Não existem fontes ou cores de marca hardcoded nas páginas.
- `npm run build` e `npx tsc --noEmit` passam.
- Home, landing comercial e perfil real são testados em desktop e mobile.
- As rotas públicas retornam HTTP 200.
- Alterações visuais são revisadas na página publicada, não somente no código.
