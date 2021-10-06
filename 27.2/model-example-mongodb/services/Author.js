const Author = require('../models/Author');

const getNewAuthor = (authorData) => {
  const { id, firstName, middleName, lastName } = authorData;

  const fullName = [firstName, middleName, lastName]
      .filter((name) => name)
      .join(' ');

  return {
      id,
      firstName,
      middleName,
      lastName,
      name: fullName,
  };
};

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
};

const getAll = async () => {
  const authors = await Author.getAll();

  return authors.map(getNewAuthor);
}

const findById = async (id) => {
  const author = await Author.findById(id);

  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: `Não foi possível encontrar um autor com o id ${id}`,
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return getNewAuthor(author);
}

const create = async (firstName, middleName, lastName) => {
  const authorValid = isValid(firstName, middleName, lastName);

  if(!authorValid) return false;

  // Buscamos um autor com o mesmo nome completo que desejamos criar
  const existingAuthor = await Author.findByName(firstName, middleName, lastName);

  // Caso esse autor já exista, retornamos um objeto de erro informando
  // que não é possível criar o autor pois ele já existe
  if (existingAuthor) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Um autor já existe com esse nome completo',
      },
    };
  }

  const { insertedId } = await Author.create(firstName, middleName, lastName);

  return getNewAuthor({
    id: insertedId,
    firstName,
    middleName,
    lastName
  });
}

module.exports = {
  getAll,
  findById,
  create,
}