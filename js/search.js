let search_page_content = document.getElementsByClassName('page-content')[0];
function submitSearch() {
    let keyword = document.getElementById('search-input').value;
    location.href = "search.html?keyword=" + keyword; //Redirecter dig til en side med dit search keyword oppe i URLen
}

/**/
/*Funktion til at opbygge sige alt efter hvad der er søgt på*/
/**/
function fetchSearch() {
    //Henter URL keyword ned
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let keyword = urlParams.get('keyword')

    fetch('https://api.mediehuset.net/stringsonline/search/' + keyword, { //Fetcher search API med keyword
        method: "GET",
    })
    .then(response => response.json())
    .then(function(data){
        if (data.status === false) { //Hvis der ingen søgeresultet er viser den hovsa ingen søgeresultater
            let no_search_results_header = document.createElement('h1');
            no_search_results_header.setAttribute('class', 'no-search-results-header');
            no_search_results_header.innerHTML = "Hovsa!";
            search_page_content.appendChild(no_search_results_header);

            let no_search_results_subheader = document.createElement('p');
            no_search_results_subheader.setAttribute('class', 'no-search-results-subheader');
            no_search_results_subheader.innerHTML = "Din søgning gav ingen resultater.";
            search_page_content.appendChild(no_search_results_subheader);
        }
        else { //Hvis der er søgeresultat viser den de resultater den har fundet
            for (i=0; i<data.items.length; i++) {
                //Produkter
                if (data.items[i].type == "product") {
                    let search_item = document.createElement('div');
                    search_item.setAttribute('class', 'search-item');
    
                    let search_item_title = document.createElement('h2');
                    search_item_title.setAttribute('class', 'search-item-title');
                    search_item_title.innerHTML = data.items[i].name;
                    search_item.appendChild(search_item_title);
    
                    let search_item_description = document.createElement('p');
                    search_item_description.setAttribute('class', 'search-item-description');
                    search_item_description.innerHTML = data.items[i].description_short;
                    search_item.appendChild(search_item_description);
    
                    let search_item_read_more = document.createElement('button');
                    search_item_read_more.setAttribute('class', 'search-item-read-more');
                    search_item_read_more.setAttribute('onclick', 'redirectToProduct("' + data.items[i].id + '")');
                    search_item_read_more.innerHTML = "Læs mere";
                    search_item.appendChild(search_item_read_more);
    
                    search_page_content.appendChild(search_item);
                }
                if (data.items[i].type == "brand") { //Brands
                    let search_item = document.createElement('div');
                    search_item.setAttribute('class', 'search-item');
    
                    let search_item_title = document.createElement('h2');
                    search_item_title.setAttribute('class', 'search-item-title');
                    search_item_title.innerHTML = data.items[i].title;
                    search_item.appendChild(search_item_title);

                    let search_item_description = document.createElement('p');
                    search_item_description.setAttribute('class', 'search-item-description');
                    search_item_description.innerHTML = data.items[i].description;
                    search_item.appendChild(search_item_description);

                    let search_item_read_more = document.createElement('button');
                    search_item_read_more.setAttribute('class', 'search-item-read-more');
                    search_item_read_more.setAttribute('onclick', 'redirectToBrand("' + data.items[i].id + '")');
                    search_item_read_more.innerHTML = "Læs mere";
                    search_item.appendChild(search_item_read_more);
    
                    search_page_content.appendChild(search_item);
                }
            }
        }
    })
}

function redirectToProduct(id) { //hvis der trykkes på et af produkt-resultaterne går den til siden for det produkt
    location.href = "produkt.html?id=" + id;
}

function redirectToBrand(id) { //hvis der trykkes på et af brand-resultaterne går den til siden for det brand
    location.href = "brand.html?id=" + id;
}