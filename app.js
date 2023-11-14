document.addEventListener("DOMContentLoaded", function() {
    const accesKey = 'rR6oxEDCltFrNQ8_y1M2qoTZws07-jtm_d-7lKzCrVc';
    const search_form = document.getElementById("search-form");
    const search_box = document.getElementById("search-box");
    const search_result = document.getElementById("search-result");
    const showMoreBtn = document.getElementById("show-more-btn");
    let keyword = "";
    let page = 1;
    async function searchImages() {
        keyword = search_box.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}&per_page=12`;

        const response = await fetch(url);
        const data = await response.json();

        if(page === 1){
            search_result.innerHTML = "";
        }
        const results = data.results;
        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLINK = document.createElement('a');
            imageLINK.href = result.links.html;
            imageLINK.target = '_blank';

            imageLINK.appendChild(image);
            search_result.appendChild(imageLINK);
        });
        showMoreBtn.style.display = 'block';
    }

    search_form.addEventListener("submit", (e) => {
        e.preventDefault();
        page = 1;
        search_result.innerHTML = ''; 
        searchImages();
    });

    showMoreBtn.addEventListener("click", () => {
        page++;
        searchImages();
    });
});