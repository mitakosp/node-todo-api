const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remoVE({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: '5c0961b5347fe402fc7fba55'}).then((todo) => {
  console.log(todo);
});

// Todo.findByIdAndRemove('5c070861ab44970940a296d3').then((todo) => {
//   console.log(todo);
// });
