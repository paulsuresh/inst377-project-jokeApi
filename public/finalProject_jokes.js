const host = window.location.origin;

async function createJoke() {
    console.log('Creating Joke')
    await fetch(`${host}/joke`, {
        method: 'POST',
    body: JSON.stringify({
      category: `${document.getElementById('category').value}`,
      joke: `${document.getElementById('joke').value}`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  await loadCustomerData();

}

async function loadJokeData() {
    await fetch(`${host}/jokes`)
    .then((res) => res.json())
    .then((resJson) => {
        const table = document.createElement('table');
        table.setAttribute('id', 'jokeInfo');

        const tableRow = document.createElement('tr');

        const tableHeading1 = document.createElement('th');
        tableHeading1.innerHTML = 'Category';
        tableRow.appendChild(tableHeading1);

        const tableHeading2 = document.createElement('th');
        tableHeading2.innerHTML = 'Joke';
        tableRow.appendChild(tableHeading2);

        table.appendChild(tableRow);

        resJson.forEach((joke_from_list) => { 
            const jokeTableRow = document.createElement('tr');
            const jokeTableCategory = document.createElement('td');
            const jokeTableJoke = document.createElement('td');

            jokeTableCategory.innerHTML = joke_from_list.category;
            jokeTableJoke.innerHTML = joke_from_list.joke;

            jokeTableRow.appendChild(jokeTableCategory);
            jokeTableRow.appendChild(jokeTableJoke);

            table.appendChild(jokeTableRow);
        });

        const preExistingTable = document.getElementById('jokeInfo');
            if (preExistingTable) {
                preExistingTable.remove();
            }
        document.body.appendChild(table);
    });  
}

// Fetch jokes from JokeAPI
async function fetchJoke() {
    const apiUrl = "https://v2.jokeapi.dev/joke/Any";
    const jokeContainer = document.getElementById("jokeContainer");
  
    // Display a loading message while fetching
    jokeContainer.innerHTML = `<p>Loading your joke...</p>`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API fetch failed");
  
      const data = await response.json();
      let joke;
  
      // Check the type of joke and format it accordingly
      if (data.type === "single") {
        joke = data.joke;
      } else if (data.type === "twopart") {
        joke = `<strong>Setup:</strong> ${data.setup}<br><strong>Delivery:</strong> ${data.delivery}`;
      }
  
      jokeContainer.innerHTML = `<p>${joke}</p>`;
    } catch (error) {
      console.error("Error fetching from API", error);
  
      jokeContainer.innerHTML = `<p>Failed to fetch a joke! Please try again later.<br>
      Here's a fallback joke: Why don’t skeletons fight each other? They don’t have the guts!</p>`;
    }
  }
  
  // Attach event listener to the joke button
  document.getElementById("fetchJoke").addEventListener("click", fetchJoke);
  


window.onload = loadJokeData;

