// Reference to the HTML element where you want to display the data
const dataContainer = document.getElementById("data");

// Function to display data
function displayData(doc) {
  const data = doc.data();
  const card = `
    <div class="photo-card">
      <img src="${data.image}" alt="Captured Image">
      <p>Caption: ${data.caption}</p>
      <p>Date: ${data.date}</p>
      <p>Location: Latitude ${data.latitude}, Longitude ${data.longitude}</p>
    </div>
  `;
  dataContainer.insertAdjacentHTML('beforeend', card);
}

// Function to retrieve data
function getData() {
  db.collection("log")
    .orderBy("date", "desc") // Order by date (newest first)
    .get()
    .then((querySnapshot) => {
      let currentDay = ''; // Track the current day
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.date.split(' ')[0]; // Get only the date (YYYY-MM-DD)

        // Check if it's a new day, then create a new section
        if (date !== currentDay) {
          currentDay = date;
          const section = document.createElement('div');
          section.className = 'photo-section';
          section.innerHTML = `<h2>${date}</h2>`;
          dataContainer.appendChild(section);
        }

        // Append the photo card to the current section
        const section = dataContainer.querySelector(`.photo-section:last-child`);
        displayDataInSection(section, doc);
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

// Function to display data in a specific section
function displayDataInSection(section, doc) {
  const data = doc.data();
  const card = `
    <div class="photo-card">
      <img src="${data.image}" alt="Captured Image">
      <p>Caption: ${data.caption}</p>
      <p>Date: ${data.date}</p>
      <p>Location: Latitude ${data.latitude}, Longitude ${data.longitude}</p>
    </div>
  `;
  section.insertAdjacentHTML('beforeend', card);
}

document.addEventListener("DOMContentLoaded", function() {
    getData();
    
    // Find all elements with class 'photo-card' and add tap event
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach((card) => {
      const hammer = new Hammer(card);
      hammer.on('tap', function() {
        // Handle tap event, for example, open a modal with larger image
        // You can implement this based on your specific needs
        console.log('Photo tapped');
      });
    });
  });