const sqlite3 = require('sqlite3').verbose();

//create a new sqlite database
const db = new sqlite3.Database('./database.db');

//create the users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    likedMovies TEXT
    );
`);


//function to get a user by email
const UsersModel = {
    insertUserToDB: (email, callback) => {
        db.run(
            `INSERT into users (email, likedMovies) VALUES (?, ?)`,
            [email, '[]'],
            function (err) {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    callback(null);
                }
            }
        )
    },
    getUserByEmail: (email, callback) => {
        db.all(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            function (err, row) {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    const user = row[0] || null;
                    callback(null, user);
                }
            }
        )
    },
    updateUser: (userId, updateData, callback) => {
        const { likedMovies } = updateData;
        db.run(
            `UPDATE users SET likedmovies = ? where id = ?`,
            [JSON.stringify(likedMovies), userId],
            function (err) {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    callback(null, this.changes);
                }
            }
        )
    },
};

//close the database connection
const closedDB = () => {
    db.close((err) => {
        if (err) return console.error(err.message);
    });
};

module.exports = { UsersModel, closedDB };