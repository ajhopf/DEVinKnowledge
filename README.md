# DEVinKnowledge

<!-- toc -->

- [Introdução] (#introdução)



## Introdução

A LAB Developer Software House está contratando novos desenvolvedores para o seu quadro de colaboradores, com o intuito de expandir os negócios. Os gestores entendem que com a chegada dos novos funcionários, será necessário realizar um onboarding contínuo para que todos fiquem em sintonia. Para isso, foi solicitado a criação de um sistema de Base do Conhecimento, com objetivo de manter as dicas e padronização da programação em um único lugar de fácil acesso para todos. É hora de ficar feliz, pois você foi escolhido para criar o DEVinKnowledge.

## Aplicação

### Adicionando novas dicas:
A aplicação possui um formulário onde podemos cadastrar novas dicas, sendo *necessários* os seguintes campos:
<ul>
  <li>Título</li>
  <li>Linguagem ou skill relacionado à dica</li>
  <li>Categoria em que se encaixa a dica: front-end, back-end, full-stack ou soft-skills</li>
  <li>Corpo de texto contento as informações relevantes</li>
</ul>

É também opcional a inclusão de um link de um vídeo do youtube na dica.

Ao clicar no botão para salvar, um modal será exibido contendo as informações da dica criada para revisão, sendo necessário a confirmação para a inserção da dica no banco de dados.

Automaticamente a dica será renderizada na página e as estatísticas atualizadas.

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/creating.JPG?raw=true)

Após, você receberá uma confirmação de que a dica foi cadastrada com sucesso:

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/create-succes.JPG?raw=true)

### Editando as dicas:

Todas dicas possuem um botão no canto inferior direito, onde é possível fazer a edição das informações

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/edit-button.JPG?raw=true)

Ao clicar no botão para edição, um modal será exibido contendo o título da dica a ser editada e como prosseguir para realizar a edição

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/edit-modal.JPG?raw=true)

Ao clicar salvar, será feita uma confirmação via modal das informações atualizadas e após você receberá a confirmação do sucesso na edição da dica:

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/confirm-edit.JPG?raw=true)
![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/edit-success.JPG?raw=true)

No exemplo aqui apresentado, a dica estava cadastrada com a categoria errada e também sem link de vídeo.
Ao realizar a atualização, repare que a contagem de cada categoria foi atualizada assim como o botão de vídeo dentro da dica tornou-se disponível.

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/edited-hint.JPG?raw=true)

### Deletando dicas:

Ao lado do botão de edição, existe o botão de exclusão. Ao ser clicado um modal será exibido, sendo necessária a confirmação para a exclusão da dica. Um vez excluída, a dica não poderá ser recuperada.

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/confirm-delete.JPG?raw=true)

### Filtrando dicas:

Utilizando os cards da parte superior da tela podemos filtras as dicas pela categoria:

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/category-filter.JPG?raw=true)

Também podemos filtrar as dicas pelo título utilizando a barra de pesquisa. Ao clicar em pesquisar, serão exibidas todas as dicas que possuem a substring pesquisada em seu título, não esta pesquisa **case insensitive**.
Ao clicar no botão de cancelar busca, a busca é cancelada e todas as dicas serão exibidas novamente.

![alt text](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/title-filter.JPG?raw=true)


## Primeiros passos:

Para clonar o repositório é preciso executar o comando

```bash 
git clone git@github.com:ajhopf/DEVinKnowledge.git
```

Para instalar as dependencias é preciso executar o comando npm install dentro da pasta onde o projeto foi clonado

```bash
# Acessar a pasta do projeto
cd DEVinKnowledge

# Instalar as dependencias do projeto
npm install
```
##Obs: se você seguir o passo a passo a seguir (*recomendado*) não é necessário rodar o comando npm install dentro da pasta do projeto.

## Atenção!

Ao seguir os passos acima você estará instalando o servidor na mesma página do projeto. Desta maneira, sempre que ocorrer uma alteração na página (seja ao criar, editar ou deletar uma dica), a página irá recarregar e ocorrerá uma nova chamada ao servidor.

Este projeto foi desenvolvido de maneira a reduzir o número de chamadas ao servidor, sendo realizada apenas uma chamada para obter as dicas salvas, no momento do carregamento da página. Após isso, quando salvamos, editamos ou excluímos a dica, o servidor é informado e o banco de dados atualizado porém não é feita uma nova chamada para obter todas as dicas, apenas a atualização diretamente no front-end da aplicação.

Para poder usufruir dessa funcionalidade, é necessário fazer a instalação do json-server em outra pasta:

## Obs: recomendamos fortemente que você siga este método para utilizar a aplicação.

1) Instale o JSON server

Dentro da pasta que você deseja criar o servidor rode o seguinte comando:

```bash
npm install json-server
```

2) Crie um arquivo `db.json` com o seguinte conteúdo:

```bash
{
  "hints": []
}
```

3) Dentro do arquivo `package.json` adicione o seguinte script:

```bash
"start": "json-server --watch data/db.json"
```

4) Inicialize o servidor com o comando start:

```bash
npm start
```

O servidor roda a partir da porta 3000:

```bash
http://localhost:3000
```

Clique [aqui](https://github.com/typicode/json-server) para mais informações sobre o json-server.
