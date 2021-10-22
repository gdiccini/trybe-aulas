const express = require('express');
const app = express();

// o objeto http será um servidor HTTP
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  // objeto cors define que vamos aceitar conexões do cliente que acessar "origin" usando os verbos "GET" e "POST"
  cors: {
    origin: 'http://localhost:3000', //url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }
});

// prover acesso aos arquivos dentro do diretório public adicionando a seguinte linha de código.
app.use(express.static(__dirname + '/public'));

// substituimos todo o código comentado abaixo por essa linha.
require('./sockets/ping')(io);

// a cada nova coexão a callback é executada
// io.on('connection', (socket) => {
//   socket.emit('ola', 'Que bom que você chegou aqui! Fica mais um cadin, vai ter bolo :)');
//   console.log('Usuário conectado. ID: ' + socket.id);
//   socket.on('ping', () => {
//     console.log(`${socket.id} emitiu um ping!`);
//     io.emit('pong', `${socket.id} enviou um ping!`); // essa linha envia um aviso para o cliente que o ping chegou
//   });
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
