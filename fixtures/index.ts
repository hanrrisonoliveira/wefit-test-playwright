import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { CartPage } from '../pages/CartPage'
import { CompraRealizadaPage } from '../pages/CompraRealizadaPage'
import { CabecalhoPage } from '../pages/CabecalhoPage'

type Fixtures = {
    cabecalho: CabecalhoPage
    homePage: HomePage
    cartPage: CartPage
    compraRealizadaPage: CompraRealizadaPage
    evidencia: (nome: string) => Promise<void>
}

export const test = base.extend<Fixtures>({
    cabecalho: async ({ page }, use) => {
        await use(new CabecalhoPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    compraRealizadaPage: async ({ page }, use) => {
        await use(new CompraRealizadaPage(page))
    },
    
    evidencia: async ({ page }, use, testInfo) => {
        await use(async (nome: string) => {
            await testInfo.attach(nome, {
                body: await page.screenshot({ fullPage: true }),
                contentType: 'image/png',
            })
        })
    },
})

export { expect } from '@playwright/test'
