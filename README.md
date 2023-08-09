
# UNO | Challenge

Parabéns, se você chegou até aqui significa que você está participando do processo seletivo de uma das melhores empresas de tecnologia do mercado!

## Como será o desafio técnico?

Nesse repositório já temos um projeto pré-desenvolvido com as tecnologias que mais utilizamos na UNO, das quais são: 
[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[NodeJs](https://nodejs.org/pt-br/docs)
[Graphql](https://graphql.org/learn/)
[React](https://pt-br.legacy.reactjs.org/docs/getting-started.html)

O projeto resume-se em um TODO LIST (Lista de tarefas), onde o usuário poderá `adicionar`, `editar`, `remover`, e `filtrar` os itens de sua lista de tarefa.

Hoje o projeto já está adicionando itens na lista e buscando os itens que estão salvos. Com isso já demos um exemplo de como você pode seguir.

Como fizemos uma estrutura simples com dados `mocados`, deverá ser feita uma manipulação de arrays, seguindo os requisitos que iremos pedir abaixo.

## Requisitos obrigatórios

 1. Deverá ser desenvolvido uma forma de editar os itens que já estão na lista.
 2. Deverá ser desenvolvido uma forma de remover os itens que estão na lista.
 3. Criar uma validação para não poder adicionar itens com o mesmo nome.
 4. Criar validação para não adicionar item com nome em branco / vazio.
 5. Poder filtrar os itens por nome.
 6. Todo método desenvolvido deverá ter documentação, explicando o que o mesmo está fazendo.

Lembrando que deverá seguir o padrão já pré-estabelecido no projeto na qual utiliza as chamadas para o backend com graphql.

## Requisitos opcionais

 1. Ajustar CSS e design para deixar a aplicação mais atraente.
 2. Criar outras ações que não foram pedidas acima.

## Como rodar o projeto?

Você deverá entrar dentro da pasta `frontend` e rodar o comando `yarn` ou `npm install`. (Lembre se de instalar o [Nodejs](https://nodejs.org/en/download)) em seu computador.

Após ter instalado as dependências com o comando acima, você deverá rodar o comando `yarn start` ainda dentro da pasta frontend, isso irá fazer com que seu frontend suba em `http://localhost:3000`.

Para a pasta serverless deverá ser feito os mesmos passos acima descritos, porém o backend estará rodando `http://localhost:4000/graphql`

## Environments Variables
  
Na pasta do frontend crie o arquivo .env caso não existir com o seguinte conteúdo abaixo.
##### **`.env`**
```
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
```

## Como apresentar o projeto?

Esse projeto deverá ser feito um fork dele, que já irá aparecer em seu github para que você nos envie e possamos baixar para analisar o código desenvolvido. 

Lembre-se de deixar seu repositório público.
