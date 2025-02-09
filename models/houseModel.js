// models/houseModel.js
const supabase = require('../config/supabaseClient');

async function createHouse(data) {
  const { energy_efficiency, bedrooms, safety, distance_work, distance_pickleball, view_marina, price, image_url } = data;
  const { data: result, error } = await supabase
    .from('houses')
    .insert([{
      energy_efficiency,
      bedrooms,
      safety,
      distance_work,
      distance_pickleball,
      view_marina,
      price,
      image_url
    }])
    .single();
  if (error) throw error;
  return result;
}

async function getHouses() {
  // Sorting by priorities:
  // 1. energy_efficiency (A best → D worst, so ascending order because "A" < "B" < "C" < "D")
  // 2. bedrooms (2 is better than 1, so descending)
  // 3. safety (true is safe, so descending)
  // 4. distance_work (shorter is better, ascending)
  // 5. distance_pickleball (shorter is better, ascending)
  // 6. view_marina (true is better, descending)
  // 7. price (lower is better, ascending)
  const { data: houses, error } = await supabase
    .from('houses')
    .select('*')
    .order('energy_efficiency', { ascending: true })
    .order('bedrooms', { ascending: false })
    .order('safety', { ascending: false })
    .order('distance_work', { ascending: true })
    .order('distance_pickleball', { ascending: true })
    .order('view_marina', { ascending: false })
    .order('price', { ascending: true });

  if (error) throw error;
  return houses;
}

module.exports = { createHouse, getHouses };
