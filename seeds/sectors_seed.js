/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const sectorsData = require('../mock/data').data;

function countSectors(sectors) {
  let count = 0;
  for (const sector of sectors) {
    count++; 
    if (sector.children) {
      count += countSectors(sector.children); 
    }
  }
  return count;
}

console.log('Items count - ', countSectors(sectorsData));

async function insertSectors(knex, sectors, parentId = null) {
  for (const sector of sectors) {
    const { value, name, children } = sector;

    try {
      // Insert the sector and get the inserted sector's ID
      const [insertedId] = await knex('Sectors').insert({ id: value, name, parent_id: parentId }).returning('id');

      // If the sector has children, insert them with the current sector's ID as their parent ID
      if (children) {
        await insertSectors(knex, children, value);
      }
    } catch (err) {
      console.error(`Failed to insert sector with id ${value}: ${err.message}`);
    }
  }
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('User_Sectors').del();
  await knex('Sectors').del();
  await knex('Users').del();

  // Insert a user
  const [userId] = await knex('Users').insert({ name: 'Test User' }).returning('id');
  console.log('inserting user',userId)
  
  // Insert sectors
  await insertSectors(knex, sectorsData);

  // Insert user sectors
  const sectors = await knex('Sectors').select('id');
  for (const sector of sectors) {
    await knex('User_Sectors').insert({ user_id: userId.id, sector_id: sector.id });
  }
};
