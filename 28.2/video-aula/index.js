const express = require('express');
const multer = require('multer');


const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage }); // pq com essa mudança a imagem passa a poder ser vizualizada?

// const upload = multer({ dest: 'uploads/' });

app.get('/ping', (req, res) => res.send('pong'));

app.post('/upload', upload.single('arquivo'), (req, res) => {
  console.log(req.body, req.file);
  return res.send('ok');
});


const PORT = 3000;

app.listen(PORT, () => console.log(`Online na port ${PORT}`));
