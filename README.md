# projeto-moeda
Trabalho realizado em equipe para a matéria de Integração de Software


## Aplicação A (Em PHP)
Aplicação faz uso da API Externa **_https://www.alphavantage.co_**, para consulta de preços de conversão de Moedas. A API espera uma moeda de origem e uma moeda destino, para então informar o preço da Moeda Destino, na Moeda Origem.
<br>

Ela recebe variáveis por meio de GET, através da própria URL, sendo as possiveis variaveis:
- **_metodo_**: O método a ser executado. (inserir, atualizar, listar ou deletar)
- **_moeda_de_**: A moeda de Origem para consulta.
- **_moeda_para_**: A moeda de Destino para consulta.
<br>

No método **_inserir_**, **_atualizar_** e **_deletar_**, é obrigatório o uso de **_moeda_de_** e **_moeda_para_**.
<br>
Já no método **_listar_**, é opcional o uso de **_moeda_de_** e **_moeda_para_**. Caso não seja informado será listado tudo no Banco de Dados.
<br>
## Aplicação B (Em Python)
Aplicação fica rodando e esperando inputs do usuário para gerar consultas na Aplicação A, por meio de requisições Web.
<br>
Para finalizar a aplicação, usar a palavra **_exit_**, no campo de **metodo**.

## Banco de Dados
Foi criado um banco com o nome **a_bd**, que tem apenas uma tabela **preco**, com as seguintes colunas.
<br>
- **_moeda_origem_**: Moeda Origem (Varchar)
- **_moeda_destino_**: Moeda Destino (Varchar)
- **_preco_**: Preço da Cotação (Decimal)
- **_data_**: Data da ultima Atualização (Timestamp)
