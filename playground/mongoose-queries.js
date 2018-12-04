const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c05bf009ae0f40d0449ed5811';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos + '\n\n');
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo (findOne): ', todo + '\n\n');
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo (findById):', todo + '\n\n');
// }).catch((e) => console.log(e));

User.findById('5c05ab376b62f909a4ccda57').then((user) => {
  if (!user) {
      return console.log('Id not found');
    }
    console.log('User (findById):', user + '\n\n');
}).catch((e) => console.log(e));
