Pacotes utilizados:

```
npm install express
npm install cors
npm install --save-dev nodemon
npm install socket.io
npm install socket.io-client
npm install cors
npm install dotevn
npm install jest /* pacote para testes */
npm install mongodb /* Apenas para se desejar salvar o histórico de mensagens */
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