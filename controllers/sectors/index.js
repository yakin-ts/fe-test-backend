const knex = require('../../utils/db');

//sectors fetch controller
const getAllSectors = async(req, res) => {
    // fetch all sectors from the database
   const sectors = await knex.select().from('Sectors')
   console.log(sectors)
   if (sectors) {
    return res.json(sectors)
   }
   return res.send('Eror fetching sectors')
}


// sectors post controller
const addSector = (req, res) => {
    const { parent_id, name } = req.body;
    knex('Sectors').insert({ name })
        .then(() => {
            res.send('Sector added successfully');
        })
        .catch(() => {
            res.send('Error adding sector');
        });
    };

    module.exports = {
        getAllSectors,
        addSector
    }





