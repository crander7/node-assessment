var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var users = require('./controllers/srvController.js');
app.use(bodyParser.json());
app.use(cors());

app.get('/api/users', users.getUsers);
app.get('/api/users/:param', users.getUserByParam);
app.post('/api/users', users.createUser);
app.post('/api/users/:type', users.createAdmin);
app.post('/api/users/language/:userId', users.updateLang);
app.post('/api/users/forums/:userId', users.updateForums);
app.delete('/api/users/forums/:userId', users.destroyForum);
app.delete('/api/users/:userId', users.destroyUser);
app.put('/api/users/:userId', users.updateUser);

var port = 3000;

app.listen(port, function() {
  console.log("Listening on port:", port);
});

module.exports = app;
