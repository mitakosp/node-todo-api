require('./config/config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);

// POST Todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET Todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET Todo
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({errorMessage: 'Todo not found'})
  }
  else {
      Todo.findOne({_id: id}).then((todo) => {
        if (todo) {
          res.send({todo});
        }
        else {
          res.status(404).send({errorMessage: 'Could not load todo.'})
        }
      }).catch((e) => {
      res.status(400).send();
    })
  }
})

// DELETE Todo
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({errorMessage: 'Todo not found'})
  }
  else {
    Todo.findOneAndDelete({_id: id}).then((todo) => {
      if (todo) {
        res.send({todo});
      }
      else {
        res.status(404).send({errorMessage: 'Could not load todo.'});
      }
    }).catch((e) => {
      res.status(400).send();
    })
  }
});

// PATCH Todo
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({errorMessage: 'Todo not found'});
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send({errorMessage: 'Could not load todo.'})
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// POST User
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
