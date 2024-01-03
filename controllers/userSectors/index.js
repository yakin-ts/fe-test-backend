const knex = require('../../utils/db');

// fetch user name, names of sectors user isassocited with upto furthes ancestor
const getUserSectors = async(req, res) => {
let  { id } = req.params;
id = Number(id)

try {
    const allSectors = await knex.select().from('Sectors');
    //   user-sector for id
    const userSectors = await knex.select().from('User_Sectors').where('user_id', Number(id))

    const user = await knex.select().from('Users').where('id', Number(id));
    console.log('user-detail',user)
   
    const getSectorName = (sectorId) => {
        const sector = allSectors.filter((sector) => sector.id === sectorId)[0];
        if(!sector) {
            return []
        }
        if (sector.parent_id !== null) {
            return getSectorName(sector.parent_id).concat(sector.name);
            }
        
        return [sector.name]
    }

    
    const sectorNames = userSectors[0].sector_ids.map((sectorId) => {
        return getSectorName(sectorId);
    }).map((sectorName) => sectorName.join(' > '));
    console.log(sectorNames)
    res.json({ name: user[0].name, sectors: sectorNames, sectorIds: userSectors[0].sector_ids.map(String) });
} catch (err) {
    console.log(err);
    res.send('Error fetching user sectors');
};







};


// add user sector association
const addUserSector = (req, res) => {
    const { name, sectors, agreed } = req.body;
    const processedSectors = sectors.map(Number)
    knex('Users').insert({ name }).returning('id')
        .then(async (userId) => {
            const id = userId[0].id;
            console.log('typeof', typeof(id))
            try {
                await knex('User_Sectors').insert({
                    'user_id': id,
                    'sector_ids': processedSectors,
                    'agreed': true
                });
                res.json({ id });
            } catch (err) {
                console.log(err);
                res.send('Error adding user sector');
            }
        }
        );
};

// update user sector association
const updateUserSector = (req, res) => {
    const { id } = req.params;
    const { sectors, agreed, name } = req.body;
    const processedSectors = sectors.map(Number);

    // update user name
    knex('Users').where('id', Number(id)).update({
        'name': name
    })
    .then(() => {
        // update user sectors
        return knex('User_Sectors').where('user_id', Number(id)).update({
            'sector_ids': processedSectors,
            'agreed': true
        });
    })
    .then(() => { 
        res.json({ id })
    })
    .catch(() => {
        res.send('Error updating user sectors');
    });
};

module.exports = {
    getUserSectors,
    addUserSector,
    updateUserSector
}