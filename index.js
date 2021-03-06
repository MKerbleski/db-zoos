require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  const secret = process.env.SECRET
  const message = "API is running"
  res.status(200).json({secret, message})
})

server.get('/api/zoos/', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos)
  }).catch(err => res.status(500).json(err))
})

server.get('/api/zoos/:id', (req, res) => {
  db('zoos').where('id', '=', req.params.id).then(zoos => {
    res.status(200).json(zoos)
  }).catch(err => res.status(500).json(err))
})

server.post('/api/zoos', (req, res) => {
  if (req.body.name) {
    db.insert(req.body).into('zoos').then(zooId => {
      res.status(201).json(zooId)
    }).catch(err => res.status(500).json(err))
  } else {
    res.status(400).json({error: "Please include a name in your request and try again."})
  }
})

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos').where('id', '=', req.params.id)
    .del()
    .then(count => {
    res.status(200).json(count)
  }).catch(err => res.status(500).json(err))
})

server.put('/api/zoos/:id', (req, res) => {
  db('zoos').where('id', '=', req.params.id)
    .update(req.body)
    .then(count => {
    res.status(200).json(count)
  }).catch(err => res.status(500).json(err))
})


server.get('/api/bears/', (req, res) => {
  db('bears').then(bears => {
    res.status(200).json(bears)
  }).catch(err => res.status(500).json(err))
})

server.get('/api/bears/:id', (req, res) => {
  db('bears').where('id', '=', req.params.id).then(bears => {
    res.status(200).json(bears)
  }).catch(err => res.status(500).json(err))
})

server.post('/api/bears', (req, res) => {
  if (req.body.name) {
    db.insert(req.body).into('bears').then(zooId => {
      res.status(201).json(zooId)
    }).catch(err => res.status(500).json(err))
  } else {
    res.status(400).json({error: "Please include a name in your request and try again."})
  }
})

server.delete('/api/bears/:id', (req, res) => {
  db('bears').where('id', '=', req.params.id)
    .del()
    .then(count => {
    res.status(200).json(count)
  }).catch(err => res.status(500).json(err))
})

server.put('/api/bears/:id', (req, res) => {
  db('bears').where('id', '=', req.params.id)
    .update(req.body)
    .then(count => {
    res.status(200).json(count)
  }).catch(err => res.status(500).json(err))
})

const port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
