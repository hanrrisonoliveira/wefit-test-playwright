import type { Page, Locator } from '@playwright/test'

export class CompraRealizadaPage {
    readonly titulo: Locator
    readonly btnVoltar: Locator

    constructor(page: Page) {
        const main = page.getByRole('main')
        this.titulo = main.getByRole('heading', { name: 'Compra realizada com sucesso!' })
        this.btnVoltar = main.getByRole('button', { name: 'Voltar' })
    }
}
