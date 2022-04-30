# projeto-moeda
Trabalho realizado em equipe para a matéria de Integração de Software


## Aplicação A (Em NodeJS)
Aplicação faz uso da API Externa **_https://www.alphavantage.co_**, para consulta de preços de conversão de Moedas. A API espera uma moeda de origem e uma moeda destino, para então realizar a conversão. Essa aplicação também faz o CRUD das moedas, pois os dados armazenados no Bando de Dados serão usados para realizar a integração com a aplicação B.

<br>
## Aplicação B (Em Python)
Aplicação agrupa todos os valores de uma moedaOrigem juntos e vai mostrar de forma ordenada pelas mais caras primeira, de acordo com as requisições feitas pelos usuários na aplicação A.
<br>