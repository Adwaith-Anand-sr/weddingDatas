document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchQueryInput = document.getElementById('searchQuery');
    const sortOptionInput = document.getElementById('sortOption');
    const searchResults = document.getElementById("searchResults");
    const main = document.querySelector("main");

    const performSearch = async () => {
        const searchQuery = searchQueryInput.value.trim();
        if (searchQuery === '') {
            searchResults.innerHTML = "";
            searchResults.style.display = "none";
            main.style.display = "block";
            return;
        }

        searchResults.innerHTML = ""; // Clear existing content
        searchResults.style.display = "block";
        main.style.display = "none";

        const sortOption = sortOptionInput.value;

        try {
            const response = await fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: searchQuery, sort: sortOption })
            });
            
            if (!response.ok) {
                throw new Error('Failed to search');
            }

            const data = await response.json();
            data.forEach((data, index) => {
                searchResults.innerHTML += `
                <div class="w-full h-[8vh] border-b">
                    <div class="ml-[1vw] w-[8%] h-[40%] opacity-[0.3]"> ${index + 1} </div>
                    <div class="flex text-[3vw] w-full h-full font-black items-start justify-between px-[5vw]">
                        <div class="name overflow-x-auto h-[2vh] whitespace-nowrap w-[30%] text-green-800"> ${data.name} </div>
                        <div class="address whitespace-nowrap overflow-x-auto h-[2vh] w-[40%] font-semibold"> ${data.address} </div>
                        <div class="amount overflow-x-auto h-[2vh] whitespace-nowrap w-[20%] text-right text-red-600"> ${data.amount} </div>
                    </div>
                </div>
                `;
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await performSearch();
    });

    
});
