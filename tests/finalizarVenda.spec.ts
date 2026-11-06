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

test.describe('Exclusão de filmes do carrinho', () => {
  test('CT02 - Deve excluir um filme do carrinho pela lixeira', async ({
    homePage,
    cabecalho,
    cartPage,
    evidencia,
  }) => {
    await test.step('Adicionar 1x "Viúva Negra" e 1x "Homem Aranha" pela Home', async () => {
      await homePage.abrirPaginaInicial()
      await homePage.adicionarAoCarrinho('Viúva Negra')
      await homePage.adicionarAoCarrinho('Homem Aranha')
      await evidencia('01 - Filmes adicionados na Home')
    })

    await test.step('Carrinho lista os filmes adicionados com subtotais e total', async () => {
      await cabecalho.abrirCarrinho()

      const filmesEsperados = [
        { filme: 'Viúva Negra', preco: 'R$ 9,99', quantidade: '1', subtotal: 'R$ 9,99' },
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

      await expect(cartPage.total).toHaveText('R$ 39,89')
      await evidencia('02 - Carrinho com subtotais e total')
    })

    await test.step('Excluir "Viúva Negra" pela lixeira recalcula total e cabeçalho', async () => {
      await cartPage.remover('Viúva Negra')

      await expect(cartPage.linha('Viúva Negra')).toHaveCount(0)
      await expect(cartPage.quantidades).toHaveCount(1)
      await expect(cartPage.quantidade('Homem Aranha')).toHaveValue('1')
      await expect(cartPage.subtotal('Homem Aranha')).toHaveText('R$ 29,90')
      await expect(cartPage.total).toHaveText('R$ 29,90')
      await expect(cabecalho.qtdItens).toHaveText('1 item')
      await evidencia('03 - Carrinho após excluir Viúva Negra')
    })
  })
})

test.describe('Carrinho após a compra', () => {
  test('CT03 - Deve manter o carrinho vazio ao voltar pelo navegador após a compra', async ({
    page,
    homePage,
    cabecalho,
    cartPage,
    compraRealizadaPage,
    evidencia,
  }) => {
    await test.step('Adicionar 1x "Viúva Negra" e finalizar o pedido', async () => {
      await homePage.abrirPaginaInicial()
      await homePage.adicionarAoCarrinho('Viúva Negra')
      await cabecalho.abrirCarrinho()
      await cartPage.finalizarPedido()

      await expect(compraRealizadaPage.titulo).toBeVisible()
      await expect(cabecalho.qtdItens).toHaveText('0 itens')
      await evidencia('01 - Compra realizada com sucesso!')
    })

    await test.step('Voltar pelo navegador exibe o carrinho vazio', async () => {
      await page.goBack()

      await expect(page).toHaveURL(/\/cart$/)
      await expect(cartPage.tituloCarrinhoVazio).toBeVisible()
      await expect(cartPage.quantidades).toHaveCount(0)
      await expect(cartPage.total).toHaveCount(0)
      await expect(cartPage.btnFinalizarPedido).toHaveCount(0)
      await expect(cabecalho.qtdItens).toHaveText('0 itens')
      await evidencia('02 - Carrinho vazio após voltar pelo navegador')
    })
  })
})
