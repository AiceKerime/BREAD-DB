// const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()

// const dataPath = './json/data.json'
// const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

// DATABASE CONNECTING
const dbFile = './database/data.db'
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) { console.log(`Failed to connect to database`, err) };
});

// EXPRESS & PORT
const app = express()
const port = 3000

// USE
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')))

// BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// SET
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// GET
app.get('/', (req, res) => {
  db.all('SELECT * FROM bread', (err, data) => {
    if (err) {
      console.log('Failed to get data')
    }
    res.render('index', { data })
  })
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.get('/edit/:id', (req, res) => {
  db.all('SELECT * FROM bread WHERE id = ?', [req.params.id], (err, data) => {
    if (err) {
      console.log('Failed to get data to edit', err)
    }
    res.render('edit', { item: data[0] })
  })
})

app.get('/delete/:id', (req, res) => {
  db.run('DELETE FROM bread WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.log('Failed to delete data')
      throw err;
    }
    res.redirect('/')
  })
})

// POST
app.post('/add', (req, res) => {
  db.run('INSERT INTO bread (string, integer, float, date, boolean) VALUES (?, ?, ?, ?, ?)', [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, JSON.parse(req.body.boolean)], (err) => {
    if (err) {
      console.log('Failed to add data')
    }
    res.redirect('/')
  })
})

app.post('/edit/:id', (req, res) => {
  db.run('UPDATE bread SET string = ?, integer = ?, float = ?, date = ?, boolean = ? WHERE id = ?',
    [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, req.params.id], (err) => {
      if (err) {
        console.error('Failed to update data', err)
      }
      res.redirect('/');
    })
})


// LISTEN
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})