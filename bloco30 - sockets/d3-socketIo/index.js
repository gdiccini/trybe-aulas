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

// a cada nova coexão a callback é executada
io.on('connection', (socket) => {
  console.log('Usuário conectado. ID: ' + socket.id);
  socket.on('ping', () => {
    console.log(`${socket.id} emitiu um ping!`)
  })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
