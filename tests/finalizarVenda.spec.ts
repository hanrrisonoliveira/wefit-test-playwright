import { test, expect } from '../fixtures'

test.describe('Finalização da compra', () => {
  test('CT01 - Deve concluir a compra com múltiplos filmes', async ({
    page,
    homePage,
    cabecalho,
    cartPage,
    compraRealizadaPage,
    evidencia,
  }) => {
    await test.step('Adicionar 2x "Viúva Negra" e 1x "Homem Aranha" pela Home', async () => {
      await homePage.abrirPaginaInicial()
      await homePage.adicionarAoCarrinho('Viúva Negra', 2)
      await homePage.adicionarAoCarrinho('Homem Aranha')
      await evidencia('01 - Filmes adicionados na Home')
    })

    await test.step('Carrinho lista os filmes adicionados com subtotais e total', async () => {
      await cabecalho.abrirCarrinho()

      const filmesEsperados = [
        { filme: 'Viúva Negra', preco: 'R$ 9,99', quantidade: '2', subtotal: 'R$ 19,98' },
        { filme: 'Homem Aranha', preco: 'R$ 29,90', quantidade: '1', subtotal: 'R$ 29,90' },
      ]

      await expect(cartPage.quantidades).toHaveCount(filmesEsperados.length)

      for (const item of filmesEsperados) {
        await expect(cartPage.imagem(item.filme)).toBeVisible()
        await expect(cartPage.titulo(item.filme)).toBeVisible()
        await expect(cartPage.precoUnitario(item.filme)).toHaveText(item.preco)
        await expect(cartPage.quantidade(item.filme)).toHaveValue(item.quantidade)
        await expect(cartPage.subtotal(item.filme)).toHaveText(item.subtotal)
      }

      await expect(cartPage.total).toHaveText('R$ 49,88')
      await evidencia('02 - Carrinho com subtotais e total')
    })

    await test.step('Incrementar "Homem Aranha" recalcula subtotal, total e cabeçalho', async () => {
      await cartPage.aumentar('Homem Aranha')

      await expect(cartPage.quantidade('Homem Aranha')).toHaveValue('2')
      await expect(cartPage.subtotal('Homem Aranha')).toHaveText('R$ 59,80')
      await expect(cartPage.total).toHaveText('R$ 79,78')
      await expect(cabecalho.qtdItens).toHaveText('4 itens')
      await evidencia('03 - Carrinho após incrementar Homem Aranha')
    })

    await test.step('Finalizar pedido exibe a confirmação e limpa o carrinho', async () => {
      await cartPage.finalizarPedido()

      await expect(page).toHaveURL(/\/purchase-made$/)
      await expect(compraRealizadaPage.titulo).toBeVisible()
      await expect(compraRealizadaPage.btnVoltar).toBeVisible()
      await expect(cabecalho.qtdItens).toHaveText('0 itens')
      await evidencia('04 - Compra realizada com sucesso!')
    })
  })
})
