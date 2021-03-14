const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const toyService = require('./services/toy.service');

const app = express();
const port = 3030;

// Express App Configuration:
// Tell express to serve static files from the public folder
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.get('/api/toy', (req, res) => {
  if (req.query) {
    toyService.search(req.query).then((toys) => res.send(toys));
  } else {
    toyService.query().then((toys) => res.send(toys));
  }
});

app.get('/api/toy/:id', (req, res) => {
  toyService.getById(+req.params.id).then((toy) => res.send(toy));
});

app.delete('/api/toy', (req, res) => {
  toyService.remove(+req.query.id).then(() => res.send({ message: 'deleted' }));
});

app.post('/api/toy', (req, res) => {
  return toyService.save(req.body.params.toy).then(() => res.send({ message: 'created' }));
});

app.put('/api/toy/:id', (req, res) => {
  return toyService.save(req.body).then(() => res.send({ message: 'updated' }));
});

app.listen(port, () => {
  console.log(`Backend ready at http://localhost:${port}`);
});
