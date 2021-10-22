module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.emit('ola', 'Bem vindo!');

    socket.on('ping', () => {
      console.log(`${socket.id} emitiu um ping!`);
      io.emit('pong', `${socket.id} enviou um ping!`)
    });
  });
};
