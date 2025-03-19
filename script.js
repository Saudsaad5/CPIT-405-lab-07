document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = 'ysRkzrnpVua875ZNX9NyE11ItwJbwGfC7FXcSktBv5M';
    const API_URL = 'https://api.unsplash.com/search/photos';

    const keywordInput = document.getElementById("keyword");
    const searchResults = document.getElementById("searchResults");
    const searchBtnXHR = document.getElementById("searchbtn");
    const searchBtnFetchPromise = document.getElementById("searchFetchPromise");
    const searchBtnFetchAsyncAwait = document.getElementById("searchFetchAsyncAwait");

    function clearResults() {
        searchResults.innerHTML = "";
    }

    function displayResults(data) {
        clearResults();

        if (!data.results || data.results.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        data.results.forEach(item => {
            let img = document.createElement("img");
            img.src = item.urls.small;
            img.alt = item.alt_description || "Image";
            img.style.margin = "10px";
            img.style.width = "200px"; 
            img.style.height = "auto"; 
            searchResults.appendChild(img);
        });
    }

  
    searchBtnXHR.addEventListener("click", function() {
        clearResults();
        let query = keywordInput.value.trim();
        if (!query) return;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${API_URL}?query=${encodeURIComponent(query)}&client_id=${API_KEY}&per_page=10`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                displayResults(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    });

    
    searchBtnFetchPromise.addEventListener("click", function() {
        clearResults();
        let query = keywordInput.value.trim();
        if (!query) return;

        fetch(`${API_URL}?query=${encodeURIComponent(query)}&client_id=${API_KEY}&per_page=10`)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error("Error fetching data:", error));
    });

    
    searchBtnFetchAsyncAwait.addEventListener("click", async function() {
        clearResults();
        let query = keywordInput.value.trim();
        if (!query) return;

        try {
            let response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&client_id=${API_KEY}&per_page=10`);
            let data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
});
