# WeMovies - Testes E2E com Playwright

[![Playwright Tests](https://github.com/hanrrisonoliveira/wefit-test-playwright/actions/workflows/playwright.yaml/badge.svg)](https://github.com/hanrrisonoliveira/wefit-test-playwright/actions/workflows/playwright.yaml)

Testes automatizados de ponta a ponta (E2E) do **WeMovies**, um e-commerce simplificado de filmes com as telas Home, Carrinho e Compra realizada.

- **Aplicação:** [WeMovies](http://wemovies-qa.s3-website.us-east-2.amazonaws.com/)
- **Protótipo:** [Figma](https://www.figma.com/file/0ZyTELvPCSCnib16XG49YP/Teste-Front-React-WeFit---2022?node-id=0%3A1)
- **Cenários de teste e critérios de aceite:** [docs/cenáriosDeTestes.md](docs/cen%C3%A1riosDeTestes.md)

## Tecnologias

- [Playwright](https://playwright.dev/) com TypeScript
- Page Object Model e fixtures do Playwright
- GitHub Actions para a integração contínua

## Cenários automatizados

| ID | Cenário | Prioridade |
| --- | --- | --- |
| CT-01 | Finalizar a compra com múltiplos filmes | Crítica |
| CT-02 | Exclusão de filmes do carrinho pela lixeira | Crítica |
| CT-03 | Manter o carrinho vazio ao voltar pelo navegador após a compra | Crítica |

Os passos e critérios de aceite de cada cenário estão em [docs/cenáriosDeTestes.md](docs/cen%C3%A1riosDeTestes.md). Todos rodam no Chromium, Firefox e WebKit.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 24 (a mesma versão usada no CI)
- Git

## Instalação

```bash
git clone https://github.com/hanrrisonoliveira/wefit-test-playwright.git
cd wefit-test-playwright
npm ci
npx playwright install --with-deps
```

O último comando baixa os navegadores usados pelo Playwright.

## Como executar

| Comando | O que faz |
| --- | --- |
| `npm test` | Roda todos os testes nos 3 navegadores |
| `npm run test:chromium` | Roda só no Chromium |
| `npm run test:firefox` | Roda só no Firefox |
| `npm run test:webkit` | Roda só no WebKit |
| `npm run test:ct01` | Roda só o CT-01 (o mesmo vale para `test:ct02` e `test:ct03`) |
| `npm run test:headed` | Roda no Chromium com o navegador visível |
| `npm run test:ui` | Abre o modo interativo do Playwright, para acompanhar passo a passo |
| `npm run test:debug` | Roda com o Playwright Inspector, para depurar |
| `npm run report` | Abre o relatório HTML da última execução |

Para passar opções extras ao Playwright, use `--` depois do script. Exemplo: `npm run test:ct01 -- --project=webkit`.

## Relatório e evidências

Depois de cada execução, rode `npm run report` para abrir o relatório HTML.

- **Evidências por passo:** cada `test.step` anexa um screenshot da tela ao final do passo, depois das asserções. Para ver, abra o teste no relatório e expanda o passo.
- **Em caso de falha:** o relatório também traz o screenshot do momento da falha, o vídeo da execução e o trace (linha do tempo com cada ação, o DOM e a rede).

## Estrutura do projeto

```
├── .github/workflows/
│   └── playwright.yaml        # CI: roda os testes nos 3 navegadores
├── docs/
│   └── cenáriosDeTestes.md    # Cenários de teste e critérios de aceite
├── fixtures/
│   └── index.ts               # Entrega as pages e a fixture de evidência aos testes
├── pages/                     # Page objects: uma classe por tela
│   ├── CabecalhoPage.ts       # Cabeçalho, compartilhado pelas 3 telas
│   ├── HomePage.ts
│   ├── CartPage.ts
│   └── CompraRealizadaPage.ts
├── tests/
│   └── finalizarVenda.spec.ts # CT-01, CT-02 e CT-03
└── playwright.config.ts       # URL base, navegadores, trace, vídeo e screenshot
```

## Padrões adotados

- **Page Object Model:** as pages só localizam elementos e executam ações; as asserções ficam nos testes.
- **Fixtures:** os testes recebem as pages prontas (`homePage`, `cartPage`, `cabecalho`...) e importam `test` e `expect` de `fixtures`, nunca direto de `@playwright/test`.
- **Localizadores por papel e texto:** `getByRole` e `getByText`, como recomenda a documentação do Playwright, em vez de classes CSS. As classes do site são geradas a cada build (ex.: `sc-eqYatC`).
- **Asserções web-first:** `toBeVisible`, `toHaveText`, `toHaveValue` e `toHaveCount`, que esperam o elemento sozinhas, sem `waitForTimeout`.
- **Isolamento:** cada teste roda numa sessão nova do navegador, então o carrinho sempre começa vazio e nenhum teste depende de outro.

## Integração contínua

O workflow [playwright.yaml](.github/workflows/playwright.yaml) roda os testes:

- a cada push na `main` ou na `test/playwright`;
- a cada pull request para a `main`;
- manualmente, na aba **Actions** → **Playwright Tests** → **Run workflow**.

Cada navegador roda num job separado. No CI, os testes têm até 2 novas tentativas em caso de falha e rodam um de cada vez. O relatório HTML de cada navegador fica disponível por 30 dias nos artefatos da execução (`playwright-report-chromium`, `playwright-report-firefox` e `playwright-report-webkit`).
