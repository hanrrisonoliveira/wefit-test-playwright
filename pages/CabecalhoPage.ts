import type { Page, Locator } from '@playwright/test'

// Cabeçalho comum a todas as telas (logo + acesso ao carrinho)
export class CabecalhoPage {
    readonly btnCarrinho: Locator
    readonly qtdItens: Locator

    constructor(page: Page) {
        const banner = page.getByRole('banner')
        this.btnCarrinho = banner.getByRole('button', { name: /Meu Carrinho/ })
        this.qtdItens = this.btnCarrinho.getByText(/\d+ ite(m|ns)/)
    }

    async abrirCarrinho() {
        await this.btnCarrinho.click()
    }
}
