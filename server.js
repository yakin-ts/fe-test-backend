const express = require('express')
const cors = require('cors');
const routes = require('./routes/');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes.sectorsRoute);
app.use('/users', routes.usersRoute);
app.use('/usersectors', routes.userSectorsRoute);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
}
);

