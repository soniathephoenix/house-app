const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api/houses'
  : 'https://house-app-4t16.onrender.com/api/houses';

// Handle form submission to POST house data
document.getElementById('houseForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`❌ Failed to submit house data: ${response.statusText}`);
    }

    console.log('✅ House successfully added!');
    loadListings();
    this.reset();
  } catch (error) {
    console.error('❌ Error:', error);
  }
});

// Fetch and display house listings
async function loadListings() {
  try {
    const response = await fetch(API_BASE_URL);
    const houses = await response.json();
    const listingsDiv = document.getElementById('listings');
    listingsDiv.innerHTML = '';

    houses.forEach(house => {
      const houseDiv = document.createElement('div');
      houseDiv.classList.add('house');

      houseDiv.innerHTML = `
        <p>Energy Efficiency: ${house.energy_efficiency}</p>
        <p>Bedrooms: ${house.bedrooms}</p>
        <p>Safety: ${house.safety ? 'Safe' : 'Unsafe'}</p>
        <p>Distance from Work: ${house.distance_work} miles</p>
        <p>Distance from Pickleball: ${house.distance_pickleball} miles</p>
        <p>View from Marina: ${house.view_marina ? 'Yes' : 'No'}</p>
        <p>Price: $${house.price}</p>
        ${house.image_url ? `<img src="${house.image_url}" alt="House Image" style="max-width:200px;">` : ''}
        <button class="delete-btn" data-id="${house.id}">Delete</button>
        <hr>
      `;

      listingsDiv.appendChild(houseDiv);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async function () {
        const houseId = this.getAttribute('data-id');
        await deleteHouse(houseId);
      });
    });

  } catch (error) {
    console.error('❌ Error loading houses:', error);
  }
}

// Function to delete a house
async function deleteHouse(id) {
  if (!confirm('🗑️ Are you sure you want to delete this house?')) return;

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('❌ Failed to delete house');
    }

    console.log(`✅ House with ID ${id} deleted`);
    loadListings();
  } catch (error) {
    console.error(error);
  }
}

// Load listings on page load
loadListings();
