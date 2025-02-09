const supabase = require('../config/supabaseClient');

async function createHouse(data) {
  try {
    console.log('Inserting house into Supabase:', data);

    const { data: result, error } = await supabase
      .from('houses')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error inserting into Supabase:', error);
      throw error;
    }

    console.log('Inserted house:', result);
    return result;
  } catch (err) {
    console.error('Unexpected error in createHouse:', err);
    throw err;
  }
}

async function getHouses() {
  try {
    console.log('Fetching houses from Supabase...');
    const { data: houses, error } = await supabase
      .from('houses')
      .select('*');

    if (error) {
      console.error('Error fetching houses:', error);
      throw error;
    }

    console.log('Fetched houses:', houses);

    houses.sort((a, b) => {
      const energyOrder = a.energy_efficiency.localeCompare(b.energy_efficiency);
      if (energyOrder !== 0) return energyOrder;

      if (b.bedrooms !== a.bedrooms) return b.bedrooms - a.bedrooms;
      if (b.safety !== a.safety) return b.safety - a.safety;
      if (a.distance_work !== b.distance_work) return a.distance_work - b.distance_work;
      if (a.distance_pickleball !== b.distance_pickleball) return a.distance_pickleball - b.distance_pickleball;
      if (b.view_marina !== a.view_marina) return b.view_marina - a.view_marina;
      return a.price - b.price;
    });

    return houses;
  } catch (err) {
    console.error('Unexpected error in getHouses:', err);
    throw err;
  }
}


async function deleteHouse(id) {
  try {
    console.log(`Deleting house with ID: ${id}`);

    const { error } = await supabase
      .from('houses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting from Supabase:', error);
      return false;
    }

    console.log(`House with ID ${id} deleted successfully`);
    return true;
  } catch (err) {
    console.error('Unexpected error in deleteHouse:', err);
    throw err;
  }
}


module.exports = { createHouse, getHouses, deleteHouse };
