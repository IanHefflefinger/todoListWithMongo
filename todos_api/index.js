// FIXME: Add notes to everything and explain what is happening in detail. ALso, add the catch-all route and make sure it works (there is a bug atm).

const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// FIXME: why do i prevent data from being displayed?
// app.get('*', (req, res) => {
//   res.status(404)
//   .send("Hey! You're not allowed here--scram!");
// })

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});