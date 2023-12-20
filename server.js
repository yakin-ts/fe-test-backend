const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('./utils/db');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// get routes
app.get('/', (req, res) => {
    // fetch all sectors from the database
    knex.select().from('Sectors')
        .then((sectors) => {
            console.log(sectors);
            res.json(sectors);
        });
    }
);


app.listen(process.env.PORT, () => {    
    console.log(`Example app listening on port ${process.env.PORT}!`);
    }
);

// post routes
// add a new user associated with a secetor
app.post('/addUser', (req, res) => {
    const { name, sectorId } = req.body;
    knex('Users').insert({ name }).returning('id')
        .then((userId) => {
            console.log(userId);
            knex('User_Sectors').insert({ user_id: userId.id, sector_id: sectorId })
                .then(() => {
                    res.json({ success: true });
                });
        });
    }
);

