# FindFit

## Descubra onde encontrar aquela peça que você viu na internet

Você está navegando no Instagram, Pinterest ou em uma loja online e encontra uma peça de roupa que adorou, mas não sabe onde comprar algo parecido?

Com o **FindFit**, basta fazer um print da imagem e anexá-lo ao site. A plataforma analisa a referência, entende o tipo de peça e apresenta opções semelhantes disponíveis no mercado — com a loja de origem, o preço e os detalhes de cada produto.

O FindFit transforma uma inspiração visual em uma busca prática:

> **Print da peça → anexo no FindFit → opções parecidas → loja e preço**

## Como funciona

1. **Encontre uma peça que chamou sua atenção**  
   Pode ser uma foto de um look, um print de uma publicação ou uma imagem salva da internet.

2. **Envie a imagem ao FindFit**  
   Na página inicial, faça o upload da referência. A imagem aparece inteira na pré-visualização, sem cortes.

3. **Refine a busca, se quiser**  
   Adicione uma descrição como “vestido midi branco de cetim” para orientar ainda mais os resultados. Quando texto e imagem indicam atributos diferentes, o texto informado pela pessoa tem prioridade.

4. **Compare peças semelhantes**  
   O FindFit organiza os resultados pela semelhança com a referência, priorizando primeiro a categoria correta — vestido com vestido, saia com saia, top com top — e depois características como comprimento, cor, material e estilo.

5. **Veja de onde é e quanto custa**  
   Cada resultado mostra informações da peça, marca ou loja de origem, preço e demais detalhes disponíveis no catálogo. A partir dali, é possível abrir a página do produto, consultar lojas próximas ou salvar a opção nos favoritos.

## Funcionalidades

- Busca por imagem com upload de prints e referências de moda
- Campo opcional para combinar imagem e descrição em texto
- Resultados organizados por relevância visual e de atributos
- Hierarquia de relevância por categoria, comprimento, cor, material e estilo
- Filtros por categoria e ordenação dos resultados
- Página de detalhes do produto
- Sugestões de peças semelhantes
- Informações de loja, preço e disponibilidade no catálogo
- Lista de lojas próximas
- Favoritos para guardar peças encontradas
- Interface responsiva com foco em uma experiência simples e visual
- Design system próprio compartilhado entre os artefatos do projeto

## Experiência principal

O FindFit não exibe uma vitrine genérica na página inicial. A experiência começa pela intenção da pessoa: enviar uma imagem ou descrever o que está procurando. Os produtos aparecem somente depois de uma busca, para que os resultados sejam relacionados à referência enviada.

Essa decisão mantém o fluxo fiel ao problema original: encontrar alternativas para uma peça específica, em vez de navegar por uma lista aleatória de produtos.

## Arquitetura

O projeto é organizado como um monorepo pnpm:

```text
.
├── artifacts/
│   ├── api-server/       # API Express e regras de busca
│   ├── findfit-ds/       # Design system, tokens e componentes
│   ├── findit-app/       # Aplicação web React + Vite
│   └── mockup-sandbox/   # Ambiente de protótipos visuais
├── lib/
│   ├── api-client-react/ # Cliente React gerado a partir da API
│   ├── api-spec/         # Contrato OpenAPI
│   ├── api-zod/          # Tipos e validações gerados
│   └── db/               # Schema PostgreSQL com Drizzle ORM
├── attached_assets/      # PRDs e materiais de referência
└── pnpm-workspace.yaml
```

### Tecnologias

- **Frontend:** React, TypeScript, Vite, Wouter e TanStack Query
- **Backend:** Node.js, Express 5 e TypeScript
- **Banco de dados:** PostgreSQL com Drizzle ORM
- **Contrato da API:** OpenAPI com clientes e schemas gerados
- **Estilos:** Tailwind CSS e `@workspace/findfit-ds`
- **Interações:** Framer Motion e componentes Radix UI
- **Gerenciamento do workspace:** pnpm

### Fluxo de dados

1. O frontend envia a referência e o texto opcional para `POST /api/busca`.
2. A API extrai os atributos de busca e registra a pesquisa.
3. `GET /api/busca/:id/resultados` calcula a relevância de cada produto.
4. Os resultados são devolvidos ao frontend já ordenados.
5. A pessoa pode abrir detalhes, consultar lojas ou salvar favoritos.

O motor de relevância usa uma abordagem **category-first**:

| Critério | Peso / comportamento |
| --- | --- |
| Categoria correta | maior peso positivo |
| Categoria incompatível | penalização forte |
| Comprimento ou subcategoria | peso alto |
| Cor | peso intermediário |
| Material | peso complementar |
| Similaridade base | desempate contínuo |

## Rodando localmente

### Pré-requisitos

- Node.js 24 ou compatível com o workspace
- pnpm
- PostgreSQL configurado para o pacote `@workspace/db`

### Instalação

```bash
pnpm install
```

### Preparar a API e os dados de demonstração

```bash
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run seed
```

O seed cria um catálogo de demonstração com categorias, lojas e produtos para testar o fluxo de descoberta.

### Iniciar os serviços

Em terminais separados:

```bash
pnpm --filter @workspace/api-server run start
```

```bash
pnpm --filter @workspace/findit-app run dev
```

No ambiente Replit, os workflows do API Server e do FindFit App já estão configurados para iniciar esses serviços.

### Verificações

```bash
pnpm run typecheck
pnpm run build
```

## API principal

| Método | Rota | Finalidade |
| --- | --- | --- |
| `POST` | `/api/busca` | Cria uma busca a partir de imagem e/ou texto |
| `GET` | `/api/busca/:id/resultados` | Retorna os produtos relevantes |
| `GET` | `/api/produtos/:id` | Exibe os detalhes de um produto |
| `GET` | `/api/lojas/proximas` | Lista lojas próximas |
| `GET` | `/api/favoritos` | Lista favoritos |
| `POST` | `/api/favoritos` | Salva um produto nos favoritos |
| `DELETE` | `/api/favoritos/:id` | Remove um favorito |
| `GET` | `/api/categorias` | Lista categorias disponíveis |

## Sobre a análise de imagem

O projeto está preparado para receber uma integração de visão computacional. Na versão atual de demonstração, a extração de atributos da imagem é simulada no backend para manter o fluxo completo funcionando sem depender de uma chave de API externa. O motor já está estruturado para receber atributos como:

- categoria;
- comprimento;
- cor;
- material;
- modelagem;
- estilo.

Uma integração futura com um modelo de visão pode substituir essa etapa sem alterar o restante do fluxo de busca, relevância e apresentação dos resultados.

## Status do projeto

O FindFit é um protótipo funcional de descoberta de moda preparado para demonstrações. O catálogo atual usa dados e imagens de demonstração; uma versão de produção pode conectar catálogos reais de lojas, links de compra, estoque e preços atualizados.

## Licença

Este projeto está sob a licença MIT.