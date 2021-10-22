module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('serverMessage', () => {}) envia uma mensagem somente para o socket que acabou de se conectar
  socket.emit('serverMessage', 'Olá, seja bem vindo ao nosso chat público! Use essa página para conversar a vontade.');

  // boradcast.emit('serverMessage', () => {}) envia uma mensagem para todos os sockets conectados, exeto o que acabo de se conectar
  socket.broadcast.emit('serverMessage', `Iiiiiirraaaa! ${socket.id} acabou de se conectar :D`);
  socket.on('clientMessage', (message) => {
    console.log(`Mensagem ${message}`);
    io.emit('serverMessage', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('serverMessage', `${socket.id} acabou de se desconectar! :(`)
  })
});