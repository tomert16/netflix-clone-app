const { UsersModel } = require('../models/UserModel.js');
const { promisify } = require('util');



module.exports.addUserEmail = async (req, res) => {
    const { email } = req.body;
    UsersModel.insertUserToDB(email, (err) => {
        if (err) {
            return res.status(404).json({ msg: 'Error inserting user email into database' });
        } else {
            return res.status(200).json({ msg: 'Success inserting user email', email });
        }
    })
}

module.exports.getLikedMovies = async (req, res) => {
    const { email } = req.params;
    try {
        const getUserByEmailPromise = promisify(UsersModel.getUserByEmail)
        const user = await getUserByEmailPromise(email);
            if (!user) {
                return res.status(404).json({ msg: 'User with given email not found' });
            }
            return res.status(200).json({ msg: 'success', movies: JSON.parse(user.likedMovies) })
    } catch (error){
        console.error(error);
        res.status(400).json({ msg: 'Error fetching movies.'})
    }
};


module.exports.addToMyList = async (req, res) => {
    const { email, data } = req.body;
    UsersModel.getUserByEmail(email, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send('User not found');
        } else {
            if (user) {
                const likedMovies = JSON.parse(user.likedMovies);
                const alreadyLikedMovie = likedMovies.find(movie => movie.id === data.id);
                if (!alreadyLikedMovie) {
                    likedMovies.push(data);
                    UsersModel.updateUser(user.id, { likedMovies: likedMovies }, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error adding movie to the list');
                        } else {
                            return res.status(201).json(data);
                        }
                    });
                } else {
                    return res.status(406).send('Already added to list')
                }
            } else {
                res.status(404).send('User not found');
            }
        }
    });
};

module.exports.removeFromMyList = async (req, res) => {
    const { email, data } = req.body;
    UsersModel.getUserByEmail(email, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send('User not found');
        } else {
            if (user) {
                const likedMovies = JSON.parse(user.likedMovies);
                likedMovies.splice(likedMovies.findIndex((movie) => movie.id === data), 1)
                UsersModel.updateUser(user.id, { likedMovies: likedMovies}, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error removing movie from the list');
                    } else {
                        return res.status(204).json({ success: true, likedMovies });
                    }
                })
            } else {
                res.status(404).send('Unable to find user');
            }
        }
    });
}
