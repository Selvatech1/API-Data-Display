document.addEventListener('DOMContentLoaded', function () {
    const dataContainer = document.getElementById('data-container');

    // Function to create a card element
    function createCard(title, artist, date, reference) {
        const card = document.createElement('div');
        card.className = 'card col-md-4';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;

        const cardArtist = document.createElement('p');
        cardArtist.className = 'card-text';
        cardArtist.textContent = `Artist: ${artist}`;

        const cardDate = document.createElement('p');
        cardDate.className = 'card-text';
        cardDate.textContent = `Date: ${date}`;

        const cardReference = document.createElement('p');
        cardReference.className = 'card-text';
        cardReference.textContent = `Reference: ${reference}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardArtist);
        cardBody.appendChild(cardDate);
        cardBody.appendChild(cardReference);
        card.appendChild(cardBody);

        return card;
    }

    // Function to fetch data from API
    function fetchData(url, dataExtractor) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const artworks = dataExtractor(data);
                artworks.forEach(artwork => {
                    const { title, artist, date, reference } = artwork;
                    const card = createCard(title, artist, date, reference);
                    dataContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // API: Art Institute of Chicago API
    fetchData(
        'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number',
        data => data.data.map(artwork => ({
            title: artwork.title,
            artist: artwork.artist_display,
            date: artwork.date_display,
            reference: artwork.main_reference_number
        }))
    );
});
