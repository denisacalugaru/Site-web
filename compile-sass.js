const sass = require('sass');
const fs = require('fs');

sass.render({
  file: 'resurse/sass/galerie.scss',
  outFile: 'resurse/css/galerie.css',
  outputStyle: 'compressed'
}, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    fs.writeFile('resurse/css/galerie.css', result.css, err => {
      if (err) console.error(err);
      else console.log('SASS compilat cu succes!');
    });
  }
});
