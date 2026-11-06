import type { Page, Locator } from '@playwright/test'

// Os botões da linha não têm aria-label nem texto,
// por isso são localizados pela posição: [0] "-", [1] "+", [2] lixeira.
export class CartPage {
    readonly quantidades: Locator
    readonly total: Locator
    readonly btnFinalizarPedido: Locator

    constructor(private readonly page: Page) {
        const main = page.getByRole('main')
        this.quantidades = main.getByRole('spinbutton')
        this.total = main.getByText('Total', { exact: true }).locator('..').getByText(/^R\$/)
        this.btnFinalizarPedido = main.getByRole('button', { name: 'Finalizar pedido' })
    }

    linha(filme: string) {
        return this.page.getByRole('main').getByRole('img', { name: filme, exact: true }).locator('..')
    }

    imagem(filme: string) {
        return this.linha(filme).getByRole('img', { name: filme, exact: true })
    }

    titulo(filme: string) {
        return this.linha(filme).getByText(filme, { exact: true })
    }

    precoUnitario(filme: string) {
        return this.linha(filme).getByText(/^R\$/).first()
    }

    quantidade(filme: string) {
        return this.linha(filme).getByRole('spinbutton')
    }

    subtotal(filme: string) {
        return this.linha(filme).getByText(/^R\$/).last()
    }

    async aumentar(filme: string) {
        await this.linha(filme).getByRole('button').nth(1).click()
    }

    async finalizarPedido() {
        await this.btnFinalizarPedido.click()
    }
}
