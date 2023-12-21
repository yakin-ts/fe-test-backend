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

app.get('/users', (req, res) => {
    // fetch all users from the database
    knex.select().from('Users')
        .then((users) => {
            res.json(users);
        });
    }
);




// post routes
// add a new user associated with a secetor
app.post('/addUser', (req, res) => {
    const { name, sectors, agreed } = req.body;
    const processedSectors = sectors.map(Number)
    knex('Users').insert({ name }).returning('id')
    .then( async (userId) => {
        const id = userId[0].id;
        try {
             await  knex('User_Sectors').insert({
                    'user_id':id,
                    'sector_ids':processedSectors,
                    'agreed': true
                });
                return  res.send('User sectors inserted successfully');
            }
            catch (err) {
              return  res.send('Error inserting user sectors');
            }
            
        });
    }
    );
    
    app.listen(process.env.PORT, () => {    
        console.log(`Example app listening on port ${process.env.PORT}!`);
        }
    );
    