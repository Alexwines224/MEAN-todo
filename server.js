// set up

var express         = require('express');
var app             = express();    // create app with express
var mongoose        = require('mongoose'); // mongoose for mongodb
var morgan          = require('morgan');  // log requests to console (express4)
var bodyParser      = require('body-parser'); //pull information from HTML POST (express4)
var methodOverride  = require('method-override'); // simulate DELETE and PUT (express4)


// configuration

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); //connect to mongoDB database on modulus.io 
app.use(express.static(__dirname + '/public'));  // set the static files location to /public
app.use(morgan('dev'));   // log every request to console
app.use(bodyParser.urlencoded({'extended':'true'}));  //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // parse application/vnd.api+json as json
app.use(methodOverride());

// define model

var Todo = mongoose.model('Todo', {
  text: String
});

//  routes

  //  api
  
    //  get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos){

          //if there is an error retrieving todo, send the error & nothing after res.send(err) will execute
          if (err)
            res.send(err)

          res.json(todos) // return all todos in JSON format


        }); // close Todo.find
    }); // close app.get

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

      // create a todo, information comes from AJAX request from Angular
      Todo.create({
        text : req.body.text,
        done : false
      }, function(err, todo) {
        if (err)
          res.send(err)

        // get and return all todos after creating new todo
        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
          res.json(todos);
        }); //close Todo.find
      
      }); // close Todo.create
    }); // close app.post

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all todos after deleting todo
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            }); //close Todo.find
        }); //close Todo.remove
    }); //close app.delete



//  listen (start app with node server.js)

app.listen(8080);
console.log("App is listening on port 8080")