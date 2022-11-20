# DEVinKnowledge

## Projeto criado utilizando Json Server para armazenamento dos dados.

### Primeiros passos:

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

## Atenção!

Ao seguir os passos acima você estará instalando o servidor na mesma página do projeto. Desta maneira, sempre que ocorrer uma alteração na página (seja ao criar, editar ou deletar uma dica), a página irá recarregar e ocorrerá uma nova chamada ao servidor.

Este projeto foi desenvolvido de maneira a reduzir o número de chamadas ao servidor, sendo realizada apenas uma chamada para obter as dicas salvas, no momento do carregamento da página. Após isso, quando salvamos, editamos ou excluímos a dica, o servidor é informado e o banco de dados atualizado porém não é feita uma nova chamada para obter todas as dicas, apenas a atualização diretamente no front-end da aplicação.

Para poder usufruir dessa funcionalidade, é necessário fazer a instalação do json-server em outra pasta:

1) Instale o JSON server

Dentro da pasta que você deseja criar o servidor rode o seguinte comando:

```bash
npm install json-server
```

Crie um arquivo `db.json` com o seguinte conteúdo:

```bash
{
  "hints": []
}
```

Dentro do arquivo `package.json` adicione o seguinte script:

```bash
"start": "json-server --watch data/db.json"
```

Inicialize o servidor com o comando start:

```bash
npm start
```

O servidor roda a partir da porta 3000:

```bash
http://localhost:3000
```





