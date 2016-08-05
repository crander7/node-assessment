var users = require('../users.json');

module.exports = {
  getUsers: function(req, res, next) {
    var result = [];
    if (req.query.language) {
      var lang = req.query.language;
      for (var i = 0; i < users.length; i++) {
        if (lang === users[i].language) {
          result.push(users[i]);
        }
      }
      res.json(result);
    }
    else if (req.query.age) {
      var age = req.query.age;
      for (var j = 0; j < users.length; j++) {
        if (Number(age) === users[j].age) {
          result.push(users[j]);
        }
      }
      res.json(result);
    }
    else if (req.query.city) {
      var city = req.query.city;
      for (var k = 0; k < users.length; k++) {
        if (city === users[k].city) {
          result.push(users[k]);
        }
      }
      res.json(result);
    }
    else if (req.query.state) {
      var state = req.query.state;
      for (var l = 0; l < users.length; l++) {
        if (state === users[l].state) {
          result.push(users[l]);
        }
      }
      res.json(result);
    }
    else if (req.query.gender) {
      var gender = req.query.gender;
      for (var m = 0; m < users.length; m++) {
        if (gender === users[m].gender) {
          result.push(users[m]);
        }
      }
      res.json(result);
    }
    else {
      res.json(users);
    }
  },
  getUserByParam: function(req, res, next) {
    if (isNaN(Number(req.params.param))) {
      var type = req.params.param;
      var result = [];
      for (var i = 0; i < users.length; i++) {
        if (type === users[i].type) {
          result.push(users[i]);
        }
      }
      res.json(result);
    }
    else {
      var id = req.params.param;
      id = Number(id);
      if (id > users[users.length - 1].id) {
        res.sendStatus(404);
      }
      else {
        for (var j = 0; j < users.length; j++) {
          if (id === users[j].id) {
            console.log(users[j].id);
            res.json(users[j]);
          }
        }
      }
    }
  },
  createUser: function(req, res, next) {
    if (req.body.first_name) {
      var id = users[users.length - 1].id + 1;
      var newUser = req.body;
      newUser.id = id;
      users.push(req.body);
      res.sendStatus(200);
    }
    else {
      res.sendStatus(204);
    }
  },
  createAdmin: function(req, res, next) {
    if (req.params.type === 'admin') {
      var id = users[users.length - 1].id + 1;
      var newAdmin = req.body;
      newAdmin.id = id;
      newAdmin.type = "admin";
      users.push(newAdmin);
      res.sendStatus(200);
    }
    else {
      res.sendStatus(204);
    }
  },
  updateLang: function(req, res, next) {
    var language = req.body.language;
    var id = req.params.userId;
    for (var i = 0; i < users.length; i++) {
      if (Number(id) === users[i].id) {
        users[i].language = language;
        res.sendStatus(200);
      }
    }
    res.sendStatus(204);
  },
  updateForums: function(req, res, next) {
    var forums = req.body.add;
    var id = req.params.userId;
    for (var i = 0; i < users.length; i++) {
      if (Number(id) === users[i].id) {
        users[i].favorites.push(forums);
        res.sendStatus(200);
      }
    }
    res.sendStatus(204);
  },
  destroyForum: function(req, res, next) {
    var result = [];
    var forum = req.query.favorite;
    var id = req.params.userId;
    for (var i = 0; i < users.length; i++) {
      if (Number(id) === users[i].id) {
        result.push(users[i].favorites);
        for (var j = 0; j < result.length; j++) {
          if (forum === result[j]) {
            result.splice(j, 1);
            users[i].favorites = result;
            res.sendStatus(200);
          }
        }
      }
    }
  },
  destroyUser: function(req, res, next) {
    var id = req.params.userId;
    for (var i = 0; i < users.length; i++) {
      if (Number(id) === users[i].id) {
        users.splice(i, 1);
        res.sendStatus(200);
      }
    }
  },
  updateUser: function(req, res, next) {
    var id = req.params.userId;
    for (var i = 0; i < users.length; i++) {
      if (Number(id) === users[i].id) {
        var user = users[i];
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.gender = req.body.gender;
        user.language = req.body.language;
        user.age = req.body.age;
        user.city = req.body.city;
        user.state = req.body.state;
        user.type = req.body.type;
        user.favorites = req.body.favorites;
        res.sendStatus(200);
      }
    }
  }





};
