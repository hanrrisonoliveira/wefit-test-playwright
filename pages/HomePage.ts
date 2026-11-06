import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async abrirPaginaInicial() {
        await this.page.goto('/');
    }

    card(filme: string): Locator {
        return this.page
            .getByRole('main')
            .getByRole('heading', { name: filme, exact: true })
            .locator('..')
    }

    btnAdicionar(filme: string): Locator {
        return this.card(filme).getByRole('button', { name: /Adicionar ao carrinho/ })
    }

    async adicionarAoCarrinho(filme: string, vezes = 1) {
        for (let i = 0; i < vezes; i++) {
            await this.btnAdicionar(filme).click()
        }
    }
}