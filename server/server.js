const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('connection established!')
})

app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  }));


app.use(bodyParser.json());
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});
