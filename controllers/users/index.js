const knex = require('../../utils/db');

const getAllUsers = async (req, res) => {
    // fetch all users from the database
    try {
        const users = await knex.select().from('Users');
        res.json(users);
    }
    catch (err) {
        res.send('Error fetching users');
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    // fetch user from the database
    try {
        const user = await knex.select().from('Users').where('id', id);
        res.json(user);
    }
    catch (err) {
        res.send('Error fetching user');
    }
}

module.exports = {
    getAllUsers,
    getUser
}

