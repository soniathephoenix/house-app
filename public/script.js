// public/script.js

// Handle form submission to POST house data.
document.getElementById('houseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    try {
      const response = await fetch('/api/houses', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to submit house data');
      }
      // Reload listings after a successful submission.
      loadListings();
      this.reset();
    } catch (error) {
      console.error(error);
    }
  });
  
  // Fetch and display house listings from the API.
  async function loadListings() {
    try {
      const response = await fetch('/api/houses');
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
          <p>Distance from Work: ${house.distance_work}</p>
          <p>Distance from Pickleball: ${house.distance_pickleball}</p>
          <p>View from Marina: ${house.view_marina ? 'Yes' : 'No'}</p>
          <p>Price: ${house.price}</p>
          ${house.image_url ? `<img src="${house.image_url}" alt="House Image" style="max-width:200px;">` : ''}
          <hr>
        `;
        listingsDiv.appendChild(houseDiv);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function loadListings() {
    try {
      const response = await fetch('/api/houses');
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
  
      // Attach event listeners for delete buttons
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async function () {
          const houseId = this.getAttribute('data-id');
          await deleteHouse(houseId);
        });
      });
  
    } catch (error) {
      console.error('Error loading houses:', error);
    }
  }
  
  // Function to delete a house
  async function deleteHouse(id) {
    if (!confirm('Are you sure you want to delete this house?')) return;
  
    try {
      const response = await fetch(`/api/houses/${id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete house');
      }
  
      console.log(`House with ID ${id} deleted`);
      loadListings(); // Reload the listings after deletion
    } catch (error) {
      console.error(error);
    }
  }
  

  
  // Load listings on page load.
  loadListings();
  