const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

app.get('/hello', handleHelloWorldReqeust);

app.listen(3000, () => {
  console.log('Aplicação ouvindo na porta 3000');
});

const langs = ['HTML', 'CSS', 'JS', 'React'];

app.get('/langs', (req, res) => {
  res.send(langs);
});

app.post('/langs', (req, res) => {
  const { name } = req.body;
  langs.push(name);
  res.send(`Linguagem ${name} adicionada com sucesso!`);
});

function handleHelloWorldReqeust(req, res) {
  res.status(200).send('Hello World');
}
