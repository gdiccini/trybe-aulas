// models/Author.js

const connection = require('./connection');
const { ObjectId } = require('mongodb');

// Cria uma string com o nome completo do autor

// const getNewAuthor = (authorData) => {
//     const { id, firstName, middleName, lastName } = authorData;

//     const fullName = [firstName, middleName, lastName]
//         .filter((name) => name)
//         .join(' ');

//     return {
//         id,
//         firstName,
//         middleName,
//         lastName,
//         name: fullName,
//     };
// };

// Converte o nome dos campos de snake_case para camelCase

// const convertFields = (authorData) => ({
//     id: authorData.id,
//     firstName: authorData.first_name,
//     middleName: authorData.middle_name,
//     lastName: authorData.last_name});

// Busca todos os autores do banco.
const getAll = async () => {
    return connection()
        .then((db) => db.collection('authors').find().toArray())
            .then((authors) =>
                authors.map(({ _id, firstName, middleName, lastName }) =>{
                return {
                    id: _id,
                    firstName,
                    middleName,
                    lastName,
                }
            })
        );
}


/*
Busca um autor específico, a partir do seu ID
@param {String} id ID do autor a ser recuperado
*/

const findById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const authorData = await connection()
        .then((db) => db.collection('authors').findOne(new ObjectId(id)));

    if (!authorData) return null;

    const { firstName, middleName, lastName } = authorData;

    return { id, firstName, middleName, lastName };
};

const create = async (firstName, middleName, lastName) =>
    connection()
        .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }));


const findByName = async (firstName, middleName, lastName) => {
    // Determinamos se devemos buscar com ou sem o nome do meio
    const query = middleName
        ? { firstName, middleName, lastName }
        : { firstName, lastName };

    // Executamos a consulta e retornamos o resultado
    const author = await connection()
        .then((db) => db.collection('authors').findOne(query));

    // Caso nenhum author seja encontrado, devolvemos null
    if (!author) return null;

    // Caso contrário, retornamos o author encontrado
    return getNewAuthor(author);
    };

module.exports = {
    getAll,
    findById,
    create,
    findByName,
};
