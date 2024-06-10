document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quote');
    const quoteAuthor = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const authorSearch = document.getElementById('author-search');

    function fetchRandomQuote() {
        fetch('get_random_quote.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    quoteText.textContent = 'Error: ' + data.error;
                    quoteAuthor.textContent = '';
                } else {
                    quoteText.textContent = data.quote;
                    quoteAuthor.textContent = `- ${data.author}`;
                }
            });
    }

    function searchQuotes() {
        const author = authorSearch.value.trim();
        if (author === '') {
            searchResults.innerHTML = '<p>Please enter an author name to search.</p>';
            return;
        }
        fetch(`search_quotes.php?author=${encodeURIComponent(author)}`)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = '';
                if (data.error) {
                    searchResults.textContent = 'Error: ' + data.error;
                } else if (data.length === 0) {
                    searchResults.textContent = 'No quotes found for this author.';
                } else {
                    data.forEach(quote => {
                        const quoteElement = document.createElement('div');
                        quoteElement.innerHTML = `<p>${quote.quote}</p><p>- ${quote.author}</p>`;
                        searchResults.appendChild(quoteElement);
                    });
                }
            });
    }

    newQuoteButton.addEventListener('click', fetchRandomQuote);
    searchButton.addEventListener('click', searchQuotes);

    // Fetch an initial random quote on page load
    fetchRandomQuote();
});
