const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('ToDoApp');

  // deleteMany
  // db.collection('Users').deleteMany({name: 'Petros'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Users').findOneAndDelete({_id: new ObjectID('5c04592e698be40665ee44cd')}).then((result) => {
  //   console.log(result);
  // });

  // client.close();
});
