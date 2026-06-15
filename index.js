require('dotenv').config();
const mongoose = require('mongoose')

const express = require("express");
const app = express();
const path = require('path');

const userRoutes = require('./server/routes/user');
const gameIdeaRoutes = require('./server/routes/gameIdea');

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use(express.static(__dirname + "/public"));

app.use('/api/users', userRoutes);
app.use('/api/games', gameIdeaRoutes);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

mongoose.connect(process.env.dbURL)
  .then(() => console.log("DB Connected!!"))
  .catch(error => console.log(error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));