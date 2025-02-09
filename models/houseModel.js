const supabase = require('../config/supabaseClient');

async function createHouse(data) {
  try {
    console.log('Inserting house into Supabase:', data);

    const { data: result, error } = await supabase
      .from('houses')
      .insert([data])
      .select()
      .single(); // Ensures Supabase returns the inserted row

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

    // Sorting in JavaScript to avoid issues with multiple `.order()` calls
    houses.sort((a, b) => {
      const energyOrder = a.energy_efficiency.localeCompare(b.energy_efficiency); // A < B < C < D
      if (energyOrder !== 0) return energyOrder;

      if (b.bedrooms !== a.bedrooms) return b.bedrooms - a.bedrooms; // 2 is better than 1
      if (b.safety !== a.safety) return b.safety - a.safety; // Safe (true) is better than unsafe (false)
      if (a.distance_work !== b.distance_work) return a.distance_work - b.distance_work; // Shorter is better
      if (a.distance_pickleball !== b.distance_pickleball) return a.distance_pickleball - b.distance_pickleball; // Shorter is better
      if (b.view_marina !== a.view_marina) return b.view_marina - a.view_marina; // True is better than false
      return a.price - b.price; // Lower is better
    });

    return houses;
  } catch (err) {
    console.error('Unexpected error in getHouses:', err);
    throw err;
  }
}

module.exports = { createHouse, getHouses };
