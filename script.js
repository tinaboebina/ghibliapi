// Get the reference to the HTML element with id 'root'
const app = document.getElementById('root');

// Create a container div element with class 'container'
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Append the container element to the root element in the HTML
app.appendChild(container);

// Define an asynchronous function called getData to fetch data from the API
async function getData() {
  try {
    // Use the fetch API to send a GET request to the specified URL
    const response = await fetch('https://ghibli.rest/films');
    
    // Check if the response from the server is not OK (status code not in 200-299 range)
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    // Parse the response body as JSON
    const data = await response.json();
    
    // Iterate over each movie object in the JSON data
    data.forEach(movie => {
      // Create a div element for each movie and set its class to 'card'
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      
      // Create a heading element (h1) for the movie title
      const h1 = document.createElement('h1');
      // Set the text content of the heading to the movie title
      h1.textContent = movie.title;
      
      // Create a paragraph element (p) for the movie description
      const p = document.createElement('p');
      // Shorten the movie description to the first 300 characters
      movie.description = movie.description.substring(0, 300);
      // Set the text content of the paragraph to the shortened description followed by '...'
      p.textContent = `${movie.description}...`;
      
      // Append the card, heading, and paragraph elements to the container div
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } catch (error) {
    // If an error occurs during the fetch or processing, catch the error and display an error message
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
    // Append the error message to the root element in the HTML
    app.appendChild(errorMessage);
  }
}

// Call the getData function to initiate the data fetching and rendering process
getData();