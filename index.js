const path = require('path');
const fs = require('fs');
const express = require('express');
const favicon = require('serve-favicon');

const app = express();
const port = 8080;

// Log environment variables
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);
console.log('process.cwd():', process.cwd());

// Create necessary folders
const vect_foldere = ['temp'];
vect_foldere.forEach(folder => {
  const caleFolder = path.join(__dirname, folder);
  if (!fs.existsSync(caleFolder)) {
    fs.mkdirSync(caleFolder);
    console.log(`Folder creat: ${caleFolder}`);
  } else {
    console.log(`Folderul există deja: ${caleFolder}`);
  }
});

// Express settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.basedir = app.get('views'); // relative paths for includes
// Serve static resources
app.use('/resurse', express.static(path.join(__dirname, 'resurse')));
app.use(favicon(path.join(__dirname, 'resurse', 'ico', 'favicon', 'favicon.ico')));

// Global error object
global.obGlobal = {
  obErori: null
};

// Initialize errors from JSON
function initErori() {
  let continut = fs.readFileSync(path.join(__dirname, 'resurse/json/erori.json'), 'utf-8');
  obGlobal.obErori = JSON.parse(continut);

  obGlobal.obErori.info_erori.forEach(eroare => {
    eroare.imagine = path.posix.join('/resurse/imagini/erori', eroare.imagine);
  });
  obGlobal.obErori.eroare_default.imagine = path.posix.join('/resurse/imagini/erori', obGlobal.obErori.eroare_default.imagine);
}

initErori();

// Middleware to add user IP to locals
app.use((req, res, next) => {
  res.locals.ipUtilizator = req.ip;
  next();
});

// Error display function
function afisareEroare(res, identificator, titlu, text, imagine) {
  let eroare = obGlobal.obErori.info_erori.find(e => e.identificator === identificator);
  if (!eroare) {
    eroare = obGlobal.obErori.eroare_default;
  }

  const dateRender = {
    titlu: titlu || eroare.titlu,
    text: text || eroare.text,
    imagine: imagine || eroare.imagine
  };

  if (eroare.status) {
    res.status(eroare.identificator || 500);
  } else {
    res.status(500);
  }

  res.render('pagini/eroare', dateRender);
}

// Block directory listing under /resurse
app.use('/resurse/*', (req, res, next) => {
  const requestedPath = path.join(__dirname, req.path);
  fs.stat(requestedPath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      afisareEroare(res, 403);
    } else {
      next();
    }
  });
});

// Routes

// Home page routes
app.get(['/', '/index', '/home'], (req, res) => {
  const caleJson = path.join(__dirname, 'resurse', 'json', 'galerie.json');
  const galerie = JSON.parse(fs.readFileSync(caleJson, 'utf-8'));
  const oraCurenta = new Date().getHours();

  let imaginiFiltrate = galerie.imagini.filter(img =>
    img.intervale_ore.some(([start, end]) => oraCurenta >= start && oraCurenta <= end)
  );

  if (imaginiFiltrate.length % 2 !== 0) {
    imaginiFiltrate.pop();
  }

  res.render('pagini/index', {
    cale_galerie: galerie.cale_galerie,
    imagini: imaginiFiltrate
  });
});

// Ruta galerie_dinamica - ATENȚIE LA ORDINE!
app.get('/galerie_dinamica', (req, res) => {
  console.log('Ruta /galerie_dinamica a fost apelată');

  const galeriePath = path.join(__dirname, 'resurse', 'json', 'galerie.json');
  const galerieJSON = JSON.parse(fs.readFileSync(galeriePath, 'utf8'));

  const imagesArray = galerieJSON.imagini;
  const caleGalerie = galerieJSON.cale_galerie;

  const options = [3, 6, 9, 12, 15];
  const numImages = options[Math.floor(Math.random() * options.length)];

  const maxOffset = imagesArray.length - numImages;
  const offset = Math.floor(Math.random() * (maxOffset + 1));

  const selectedImages = imagesArray.slice(offset, offset + numImages);

  console.log('Trimitem către template:', { numImages, selectedImages, caleGalerie });

  res.render('pagini/galerie_dinamica', {
    images: selectedImages,
    numImages: numImages,
    caleGalerie: caleGalerie
  });
});

// Ruta wildcard - trebuie să fie ULTIMA
app.get('/*', (req, res, next) => {
  // codul pentru alte pagini
});


// Other specific routes
app.get('/video-vtt', (req, res) => {
  res.render('pagini/video-vtt');
});

app.get('/despre', (req, res) => {
  res.render('pagini/despre');
});

app.get('/acasa', (req, res) => {
  res.render('pagini/acasa');
});

// Block direct access to .ejs files
app.get('/*.ejs', (req, res) => {
  afisareEroare(res, 400);
});

// Block access to directories under /resurse with trailing slash
app.get('/resurse/*/', (req, res) => {
  afisareEroare(res, 403);
});

// Wildcard route - LAST route to catch all other requests
app.get('/*', (req, res, next) => {
  let pagina = req.params[0] || 'index';

  if (pagina.startsWith('resurse/')) {
    return next();
  }
  if (!pagina || pagina.trim() === '') {
    pagina = 'index';
  }

  console.log('Render view:', pagina);

  res.render(`pagini/${pagina}`, (err, html) => {
    if (err) {
      console.error(`Eroare la randarea paginii "${pagina}":`, err.message);
      if (err.message.includes('Failed to lookup view')) {
        return afisareEroare(res, 404);
      }
      return afisareEroare(res);
    }
    res.send(html);
  });
});

// Start server
app.listen(port, () => {
  console.log(`ScaiGarden rulează la http://localhost:${port}`);
});
