# Aplicação de chat online com o visual do terminal do ubunto

Pacotes utilizados:

```
npm install express
npm install body-parser
npm install cors
npm install --save-dev nodemon
npm install socket.io
npm install socket.io-client
npm install cors
npm install dotevn
npm install jest /* pacote para testes */
npm install mongodb /* Apenas para se desejar salvar o histórico de mensagens */
```

Gerenciar o heroky no terminal
```
sudo snap install hello-world
sudo snap install heroku --classic
```

É necessário fazer login no heroku
```
heroku login
```

## Problemas como o pacote mongodb
Ao tentar colocar a api online, retorna o seguinte ero:
```
const utf8Encoder = new util.TextEncoder()
```

Para corrigir:

Lá na pasta node_modules:
```
whatwg-url/dist/encoding
```

dentro do "use strict" ja na primeira linha, coloca isso:
```javaScript
const util = require('util');
```
Nas duas linhas seguintes:
Substituir:
```javaScript
const utf8Encoder = new TextEncoder();
```
Por:
```javaScript
const utf8Encoder = new util.TextEncoder();
```
e

Substituir:
```javaScript
const utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true });
```
Por:
```javaScript
const utf8Decoder = new util.TextDecoder("utf-8", { ignoreBOM: true }); (editado)
```
## O arquivo deve ficar assim:

```javaScript
// "use strict";
const util = require('util');
const utf8Encoder = new util.TextEncoder()
const utf8Decoder = new util.TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string) {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes) {
  return utf8Decoder.decode(bytes);
}

module.exports = {
  utf8Encode,
  utf8DecodeWithoutBOM
};
```
Outra alternativa

```
npm install text-encoding --save
```

1. Renomeando um repositório
### Para renomear um repositorio/aplicação, é necessário que ela esteja no remote, caso não esteja utilizar o comando abaixo:
heroku git:remote -a <nomeDoAplicativo>
heroku git:remote -a still-mesa-13667

### Mudando no nome do aplicativo:
heroku apps:rename webchat-terminal --app still-mesa-13667

### Mudando o nome do remote
git remote rename heroku webchat-terminal

2. Variáveis de ambiente
heroku config:set <NOME_DA_VARIAVEL>=<valor> --app <nomeDoAplicativo>
### Exemplo:
heroku config:set MESSAGE='Variáveis funcionam!!!' --app nome-do-seu-app-12345

### Vendo quais variáveis estão configuradas na aplicação
heroku config --app <nomeDoAplicativo>

# Fazendo deploy no heroku

```javaScript
git push <remote> <branch-do-git>:master git push <nome-da-aplicacao>
git push heroku master: master git push webchat-terminal
```
3. Configurar as variáveis de ambiente
heroku config:set PM2_PUBLIC_KEY="<valor>" --app <nomeDaAplicacao>
heroku config:set PORT="3000" --app webchat-terminal
