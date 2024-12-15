

async function createJoke() {
    console.log('Creating Joke')
    await fetch('http://localhost:3000/joke', {
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
    await fetch('http://localhost:3000/jokes')
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


window.onload = loadJokeData;

