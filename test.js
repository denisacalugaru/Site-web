const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index'); // asigură-te că există views/index.ejs
});

app.listen(8080, () => {
  console.log('Serverul rulează la http://localhost:8080');
});
