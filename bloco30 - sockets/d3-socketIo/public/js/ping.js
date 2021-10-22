// mudamos a chamada da função io() para window.io() , isso serve para enfatizar que a função io é uma função injetada ao objeto window do DOM da página.
const socket = window.io();

const button = document.querySelector('#pingButton');
button.addEventListener('click', (e) => {
  socket.emit('ping');
  return false;
});

// cria uma `li` e coloca dentro da `ul` com `id` mensagens
const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

// Quando nosso evento `ola` for emitido, vamos pegar a string mensagem enviada pelo nosso evento e passar para a função `createMessage`
socket.on('ola', (mensagem) => createMessage(mensagem));
// Quando o evento `pong` for emitido pelo servidor, vamos pegar a string mensagem enviada e passar para a função `createMessage`
socket.on('pong', (mensagem) => createMessage(mensagem));