# DEVinKnowledge

##Introdução

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

![alt text](https://github.com/ajhopf/DEVinKnowledge/assets/images/readme/creating.JPG](https://github.com/ajhopf/DEVinKnowledge/blob/main/assets/images/readme/creating.JPG?raw=true)

### Editando as dicas:




Ao salvarmos a dica

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




