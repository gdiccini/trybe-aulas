const Author = require('../models/Author');

const listAuthors = async (req, res) => {
  const authors = await Author.getAll();

  // No controller, tudo que precisamos fazer é chamar res.render , passando o caminho do arquivo. Os dados necessários para renderizar o template são passados como um objeto no segundo parâmetro. Como o JavaScript que embutimos na view espera que exista uma variável authors , passamos nesse objeto uma propriedade authors contendo a lista de escritores.
  res.status(200).render('authors/index', { authors });
};

const showAuthor = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);

  if (!author) return res.status(404).render('404');

  res.status(200).render('authors/show', { author });
};

const newAuthor = (req, res) => {
  res.render('authors/new', { message: null });
};

const createAuthor = async (req, res) => {
  console.log(req.body);
  const { first_name, middle_name, last_name } = req.body;
  console.log(first_name, middle_name, last_name);

  if (!Author.isValid(first_name, middle_name, last_name)) {
    return res.render('authors/new', { message: 'Dados inválidos' });
  }

  await Author.create(first_name, middle_name, last_name);
  res.redirect('authors');
};

module.exports = {
  listAuthors,
  showAuthor,
  newAuthor,
  createAuthor,
}