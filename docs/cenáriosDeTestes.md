# WeMovies - Cenários de Teste e Critérios de Aceitação

Especificação de 10 cenários de teste com critérios de aceitação para a aplicação WeMovies.

- **Aplicação:** [WeMovies](http://wemovies-qa.s3-website.us-east-2.amazonaws.com/)
- **Protótipo:** [Figma](https://www.figma.com/file/0ZyTELvPCSCnib16XG49YP/Teste-Front-React-WeFit---2022?node-id=0%3A1)

## Prioridades

| Prioridade | Critério | Cenários |
| --- | --- | --- |
| Crítica | Impede a compra ou gera um valor/pedido incorreto | CT-01, CT-02 e CT-03 |
| Média | Prejudica a jornada de compra, mas existe uma alternativa para o usuário | CT-04, CT-05, CT-06, CT-07 e CT-08 |
| Baixa | Afeta detalhes de exibição ou de navegação, sem impacto na compra | CT-09 e CT-10 |

## Resumo dos casos de teste

| ID | Caso de teste | Telas | Prioridade | Automatizado |
| --- | --- | --- | --- | --- |
| CT-01 | Finalizar a compra com múltiplos filmes | Home, Carrinho e Compra realizada | Crítica | Sim |
| CT-02 | Exclusão de filmes do carrinho pela lixeira | Home e Carrinho | Crítica | Sim |
| CT-03 | Manter o carrinho de compras vazio ao voltar pela seta do browser após a compra | Home, Carrinho e Compra realizada | Crítica | Sim |
| CT-04 | Exibir carrinho de compras vazio após a compra | Home, Carrinho e Compra realizada | Média | Não |
| CT-05 | Retornar à listagem de filmes após a compra | Home, Carrinho e Compra realizada | Média | Não |
| CT-06 | Finalizar a compra em layout mobile | Home, Carrinho e Compra realizada | Média | Não |
| CT-07 | Diminuir a quantidade pelo botão "-" | Home e Carrinho | Média | Não |
| CT-08 | Manter o carrinho após recarregar a página | Home e Carrinho | Média | Não |
| CT-09 | Exibir "item" no singular e "itens" no plural no cabeçalho | Home | Baixa | Não |
| CT-10 | Voltar para a Home pelo logo "WeMovies" | Home, Carrinho e Compra realizada | Baixa | Não |

## Casos de teste

### CT-01 - Finalizar a compra com múltiplos filmes

**Prioridade:** Crítica

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio.
    - Lista de filmes disponíveis com os filmes "Viúva Negra" e "Homem Aranha".

**Passos:**

    1. Acessar a Home
    2. Clicar 2 vezes no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Clicar 1 vez no "Adicionar ao carrinho" do filme "Homem Aranha"
    4. Acessar o carrinho pela cesta de compras
    5. Clicar em "+" na linha de "Homem Aranha"
    6. Clicar em "Finalizar Pedido"

**Critérios de aceite:**

    - O carrinho deve listar exatamente os filmes adicionados, com imagem, título, preço unitário, quantidade e subtotal.
    - Após o passo 4, os subtotais são R$ 19,98 ("Viúva Negra") e R$ 29,90 ("Homem Aranha"), e o total é R$ 49,88.
    - Após o passo 5, "Homem Aranha" fica com quantidade 2 e subtotal R$ 59,80.
    - Após o passo 5, o total é R$ 79,78 e o cabeçalho exibe "4 itens".
    - Ao finalizar, o cliente é direcionado para a rota `/purchase-made`.
    - A tela exibe "Compra realizada com sucesso!" e o botão "Voltar".
    - O cabeçalho passa a exibir "0 itens".

**Resultado esperado:**

    A compra é concluída com 2 unidades de "Viúva Negra" e 2 de "Homem Aranha", no valor total de R$ 79,78. O usuário vê a confirmação "Compra realizada com sucesso!" e o carrinho fica vazio.

### CT-02 - Exclusão de filmes do carrinho pela lixeira

**Prioridade:** Crítica

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com os filmes "Viúva Negra" e "Homem Aranha"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Clicar 1 vez no "Adicionar ao carrinho" do filme "Homem Aranha"
    4. Acessar o carrinho pela cesta de compras
    5. Clicar no botão "lixeira" na linha de "Viúva Negra"

**Critérios de aceite:**

    - O carrinho deve listar exatamente os filmes adicionados, com imagem, título, preço unitário, quantidade e subtotal.
    - Após o passo 4, os subtotais são de R$ 9,99 ("Viúva Negra") e R$ 29,90 ("Homem Aranha"), e o total é R$ 39,89.
    - Após o passo 5, "Viúva Negra" é removido do carrinho e "Homem Aranha" permanece com a quantidade 1 e subtotal R$ 29,90.
    - Após o passo 5, o total é R$ 29,90 e o cabeçalho exibe "1 item".

**Resultado esperado:**

    "Viúva Negra" é excluído do carrinho pela lixeira e o total é recalculado. O carrinho fica apenas com 1 unidade de "Homem Aranha", no valor total de R$ 29,90.

### CT-03 - Manter o carrinho de compras vazio ao voltar pela seta do browser após a compra

**Prioridade:** Crítica

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com o filme "Viúva Negra"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Acessar o carrinho pela cesta de compras
    4. Clicar em "Finalizar Pedido"
    5. Clicar no botão "Voltar" do navegador

**Critérios de aceite:**

    - Após o passo 4, a tela exibe a mensagem "Compra realizada com sucesso!" e o cabeçalho exibe "0 itens."
    - Após o passo 5, o usuário retorna para a rota /cart
    - O carrinho de compras exibe a mensagem "Parece que não há nada por aqui :(", sem itens, sem total, sem botão "Finalizar Pedido"
    - O cabeçalho continua exibindo "0 itens"

**Resultado esperado:**

    Ao voltar pelo navegador depois da compra, o usuário encontra o carrinho vazio. Os itens do pedido finalizado não reaparecem, e não é possível finalizar o mesmo pedido novamente.

### CT-04 - Exibir carrinho de compras vazio após a compra

**Prioridade:** Média

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com o filme "Viúva Negra"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Acessar o carrinho pela cesta de compras
    4. Clicar em "Finalizar Pedido"
    5. Clicar no botão "Voltar" da tela de compra realizada
    6. Acessar o carrinho pela cesta de compras

**Critérios de aceite:**

    - Após o passo 5, o usuário retorna para a Home (rota /), o filme "Viúva Negra" exibe o contador "0" no botão "Adicionar ao carrinho" e o cabeçalho exibe "0 itens"
    - Após o passo 6, o usuário é direcionado para a rota /cart
    - O carrinho de compras exibe a mensagem "Parece que não há nada por aqui :(" e o botão "Recarregar página", sem itens, sem total e sem botão "Finalizar Pedido"
    - O carrinho continua vazio e o cabeçalho continua exibindo "0 itens"

**Resultado esperado:**

    Ao voltar pela tela de compra realizada, o usuário encontra a Home com os contadores zerados e o carrinho vazio. Nenhum item do pedido finalizado permanece no carrinho.

### CT-05 - Retornar à listagem de filmes após a compra

**Prioridade:** Média

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com os 6 filmes do catálogo

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Acessar o carrinho pela cesta de compras
    4. Clicar em "Finalizar Pedido"
    5. Clicar no botão "Voltar" da tela de compra realizada

**Critérios de aceite:**

    - Após o passo 5, o usuário retorna para a Home (rota /)
    - A listagem exibe os 6 filmes do catálogo, cada um com imagem, título, preço e o botão "Adicionar ao carrinho"
    - Todos os filmes exibem o contador "0" no botão "Adicionar ao carrinho"

**Resultado esperado:**

    Após a compra, o usuário volta para a listagem completa de filmes, com todos os contadores zerados, e consegue iniciar uma nova compra normalmente.

### CT-06 - Finalizar a compra em layout mobile

**Prioridade:** Média

**Pré-condições:**

    - Navegador com resolução de tela de 393 x 852 px (ex.: iPhone 16)
    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com o filme "Viúva Negra"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Acessar o carrinho pela cesta de compras
    4. Clicar em "Finalizar Pedido"

**Critérios de aceite:**

    - A Home exibe os filmes em uma única coluna
    - Após o passo 2, o cabeçalho exibe "1 item"
    - No carrinho, imagem, título, preço, quantidade, subtotal e total ficam dentro da largura da tela
    - Os botões "-", "+", lixeira e "Finalizar Pedido" ficam visíveis e clicáveis
    - Após o passo 4, a tela exibe a mensagem "Compra realizada com sucesso!" e o botão "Voltar"
    - Nenhuma das telas apresenta rolagem horizontal
    - As telas seguem os frames mobile do protótipo no Figma

**Resultado esperado:**

    O usuário consegue concluir a compra pelo celular, com todas as informações e botões visíveis e sem rolagem horizontal em nenhuma tela.

### CT-07 - Diminuir a quantidade pelo botão "-"

**Prioridade:** Média

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com os filmes "Viúva Negra" e "Homem Aranha"

**Passos:**

    1. Acessar a Home
    2. Clicar 2 vezes no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Homem Aranha"
    4. Acessar o carrinho pela cesta de compras
    5. Clicar em "-" na linha de "Viúva Negra"
    6. Clicar novamente em "-" na linha de "Viúva Negra"

**Critérios de aceite:**

    - Após o passo 4, os subtotais são R$ 19,98 ("Viúva Negra") e R$ 29,90 ("Homem Aranha"), e o total é R$ 49,88
    - Após o passo 5, "Viúva Negra" fica com quantidade 1 e subtotal R$ 9,99, o total é R$ 39,89 e o cabeçalho exibe "2 itens"
    - Após o passo 6, "Viúva Negra" é removido do carrinho, pois a quantidade nunca chega a 0
    - Após o passo 6, "Homem Aranha" permanece com quantidade 1 e subtotal R$ 29,90, o total é R$ 29,90 e o cabeçalho exibe "1 item"

**Resultado esperado:**

    O botão "-" diminui a quantidade em 1 unidade e recalcula o subtotal, o total e o cabeçalho. Quando a quantidade é 1, o botão remove o filme do carrinho.

### CT-08 - Manter o carrinho após recarregar a página

**Prioridade:** Média

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com os filmes "Viúva Negra" e "Homem Aranha"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Homem Aranha"
    4. Recarregar a página
    5. Acessar o carrinho pela cesta de compras
    6. Clicar em "+" na linha de "Viúva Negra"
    7. Recarregar a página

**Critérios de aceite:**

    - Após o passo 4, os filmes "Viúva Negra" e "Homem Aranha" continuam exibindo o contador "1" e o cabeçalho exibe "2 itens"
    - Após o passo 5, o carrinho lista os 2 filmes com quantidade 1 e o total é R$ 39,89
    - Após o passo 6, "Viúva Negra" fica com quantidade 2 e subtotal R$ 19,98, e o total é R$ 49,88
    - Após o passo 7, o usuário continua na rota /cart, "Viúva Negra" mantém a quantidade 2, o total continua R$ 49,88 e o cabeçalho exibe "3 itens"

**Resultado esperado:**

    O carrinho é mantido ao recarregar a página, tanto na Home quanto no carrinho, inclusive com as quantidades alteradas.

### CT-09 - Exibir "item" no singular e "itens" no plural no cabeçalho

**Prioridade:** Baixa

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com o filme "Viúva Negra"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Clicar mais 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"

**Critérios de aceite:**

    - Após o passo 1, o cabeçalho exibe "0 itens"
    - Após o passo 2, o cabeçalho exibe "1 item"
    - Após o passo 3, o cabeçalho exibe "2 itens"

**Resultado esperado:**

    O cabeçalho usa "item" no singular para 1 unidade e "itens" no plural para 0 ou mais de 1 unidade.

### CT-10 - Voltar para a Home pelo logo "WeMovies"

**Prioridade:** Baixa

**Pré-condições:**

    - Usuário na home page
    - Carrinho vazio
    - Lista de filmes disponíveis com o filme "Viúva Negra"

**Passos:**

    1. Acessar a Home
    2. Clicar 1 vez no botão "Adicionar ao carrinho" do filme "Viúva Negra"
    3. Acessar o carrinho pela cesta de compras
    4. Clicar no logo "WeMovies"
    5. Acessar o carrinho pela cesta de compras
    6. Clicar em "Finalizar Pedido"
    7. Clicar no logo "WeMovies"

**Critérios de aceite:**

    - Após o passo 4, o usuário retorna para a Home (rota /), o filme "Viúva Negra" exibe o contador "1" e o cabeçalho exibe "1 item"
    - Após o passo 7, o usuário retorna para a Home (rota /), o filme "Viúva Negra" exibe o contador "0" e o cabeçalho exibe "0 itens"

**Resultado esperado:**

    O logo "WeMovies" leva o usuário para a Home a partir de qualquer tela, sem alterar o carrinho.