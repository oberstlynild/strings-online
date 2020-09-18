/**/
/*Funktion til at fetch produktets detajler ud fra id*/
/**/
function fetchProduktDetaljer() {
    //henter produkt id fra url
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let data_id = urlParams.get('id');
    fetch('https://api.mediehuset.net/stringsonline/products/' + data_id, { //fetch produkt med id fra url
            method: "GET",
        })
        .then(response => response.json())
        .then(function (data) {
            //opbygger html objekter og indsætter på siden
            let grid_left = document.getElementById('produkt-detajle-grid-left');
            let grid_middle = document.getElementById('produkt-detajle-grid-middle')
            let grid_right = document.getElementById('produkt-detajle-grid-right')
            let product_image = document.createElement('img');
            product_image.src = data.item.image.fullpath;
            product_image.setAttribute('id', 'product-image');
            grid_left.appendChild(product_image);

            let product_title = document.createElement('h1');
            product_title.setAttribute('id', 'product-title');
            product_title.innerHTML = data.item.name;
            grid_middle.appendChild(product_title);

            let product_brand = document.createElement('p'); //Opretter HTML object
            product_brand.setAttribute('id', 'product-brand'); //Sætter en attribut på det oprettede HTML object
            product_brand.innerHTML = 'Brand: <span id="product-brand-span">' + data.item.brand + '</span>'; //Sætter indhold i HTML object
            grid_middle.appendChild(product_brand); //Tilføjer HTML object til andet object

            let product_description = document.createElement('p');
            product_description.setAttribute('id', 'product-description');
            product_description.innerHTML = data.item.description_long;
            grid_middle.appendChild(product_description);

            let product_price = document.createElement('button');
            product_price.setAttribute('id', 'product-price');
            //skifter mellem tilbud og almindelig pris
            if (data.item.offerprice != 0) {
                product_price.innerHTML = 'Pris: DKK ' + data.item.offerprice;
            } else {
                product_price.innerHTML = 'Pris: DKK ' + data.item.price;
            }
            grid_right.appendChild(product_price);

            let product_kurv_grid = document.createElement('div');
            product_kurv_grid.setAttribute('id', 'product-kurv-grid');

            let product_quantity = document.createElement('input');
            product_quantity.type = "number";
            product_quantity.setAttribute('id', 'product-quantity');
            product_quantity.value = 1;
            product_kurv_grid.appendChild(product_quantity);

            let product_add_kurv = document.createElement('button'); //Opretter HTML object
            product_add_kurv.innerHTML = "Læg i kurv"; //Sætter indhold i HTML object
            product_add_kurv.setAttribute('id', 'product-add-kurv'); //Sætter attribut på HTML object (ID)
            product_add_kurv.setAttribute('onclick', 'addToBasketFromDetails("' + data.item.id + '")'); //Sætter onclick på object
            product_kurv_grid.appendChild(product_add_kurv); //Tilføjer HTML object til andet object
            grid_right.appendChild(product_kurv_grid);

            let product_stock = document.createElement('p');
            product_stock.setAttribute('id', 'product-stock');
            product_stock.innerHTML = data.item.stock + '+ på lager';
            grid_right.appendChild(product_stock);

            let product_rating_wrapper = document.createElement('div');
            product_rating_wrapper.setAttribute('id', 'product-rating-wrapper');

            fetchStjerner();
        })
}

/**/
/*Funktion til at fetche de stjerner man har sat på produktet (font awesome stjerner)*/
/**/
function fetchStjerner() {
    let bearer_token = sessionStorage.getItem('bearer');
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let data_id = urlParams.get('id');
    fetch('https://api.mediehuset.net/stringsonline/ratings/' + data_id, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function (data) {
            if (data.status == false) { //hvis man ingen stjerner har sat så lav grå font awesome stjerner på siden
                let font_awesome_star_container = document.createElement('div');
                font_awesome_star_container.setAttribute('id', 'font-awesome-star-container');
                for (i = 0; i < 5; i++) {
                    let index = i + 1;
                    let font_awesome_star = document.createElement('i');
                    font_awesome_star.setAttribute('class', 'fas fa-star star-grey star-not-rated');
                    font_awesome_star.setAttribute('id', 'star-' + index);
                    font_awesome_star.setAttribute('onmouseenter', 'onMouseenterEffect(this)');
                    font_awesome_star.setAttribute('onmouseleave', 'onMouseleaveEffect(this)');
                    font_awesome_star.setAttribute('onclick', 'postRating(this)');
                    font_awesome_star_container.appendChild(font_awesome_star);
                }
                document.getElementById('produkt-detajle-grid-right').appendChild(font_awesome_star_container);
            } else { //Hvis man allerede har sat stjerner
                let font_awesome_star_container = document.createElement('div');
                font_awesome_star_container.setAttribute('id', 'font-awesome-star-container');
                let rest_num_stars = (5 - data.num_stars); //regner ud hvor mange grå stjerner der skal være alt efter hvad man har givet af rating
                for (i = 0; i < data.num_stars; i++) {
                    let font_awesome_star = document.createElement('i');
                    font_awesome_star.setAttribute('class', 'fas fa-star star-yellow');
                    font_awesome_star_container.appendChild(font_awesome_star);
                }
                for (i = 0; i < rest_num_stars; i++) {
                    let font_awesome_star = document.createElement('i');
                    font_awesome_star.setAttribute('class', 'fas fa-star star-grey');
                    font_awesome_star_container.appendChild(font_awesome_star);
                }
                document.getElementById('produkt-detajle-grid-right').appendChild(font_awesome_star_container);
            }
        })
}

/**/
/*Funktion til at post sin rating på et produkt til APIen*/
/**/
function postRating(object) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let data_id = urlParams.get('id');
    let num_stars = object.id.slice(5, 6); //bruger ID fra HTML object til at finde ud af hvilken stjerne der er klikket på, men kun det 5-6 cifre (som er idet)
    let bearer_token = sessionStorage.getItem('bearer');
    let formData = new FormData()
    formData.append('product_id', data_id)
    formData.append('num_stars', num_stars)
    fetch('https://api.mediehuset.net/stringsonline/ratings', {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
            body: formData,
        })
        .then(response => response.json())
        .then(function (data) {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            let data_id = urlParams.get('id');
            location.href = 'produkt.html?id=' + data_id; //opdatere siden for at vise stjernerne
        })
}

/**/
/*Funktion til at ændre CSS hvis musen tages henover stjernerne*/
/**/
function onMouseenterEffect(object) {
    let star_one = document.getElementById('star-1');
    let star_two = document.getElementById('star-2');
    let star_three = document.getElementById('star-3');
    let star_four = document.getElementById('star-4');
    let star_five = document.getElementById('star-5');
    if (object.id == "star-1") {
        star_one.style.color = "#FBB03B";
    }
    if (object.id == "star-2") {
        star_one.style.color = "#FBB03B";
        star_two.style.color = "#FBB03B";
    }
    if (object.id == "star-3") {
        star_one.style.color = "#FBB03B";
        star_two.style.color = "#FBB03B";
        star_three.style.color = "#FBB03B";
    }
    if (object.id == "star-4") {
        star_one.style.color = "#FBB03B";
        star_two.style.color = "#FBB03B";
        star_three.style.color = "#FBB03B";
        star_four.style.color = "#FBB03B";
    }
    if (object.id == "star-5") {
        star_one.style.color = "#FBB03B";
        star_two.style.color = "#FBB03B";
        star_three.style.color = "#FBB03B";
        star_four.style.color = "#FBB03B";
        star_five.style.color = "#FBB03B";
    }
}

/**/
/*Funktion til at ændre stjerne CSS hvis musen fjernes fra dem*/
/**/
function onMouseleaveEffect(object) {
    let star_one = document.getElementById('star-1');
    let star_two = document.getElementById('star-2');
    let star_three = document.getElementById('star-3');
    let star_four = document.getElementById('star-4');
    let star_five = document.getElementById('star-5');
    star_one.style.color = "#484848";
    star_two.style.color = "#484848";
    star_three.style.color = "#484848";
    star_four.style.color = "#484848";
    star_five.style.color = "#484848";
}

/**/
/*Funktion til at tilføje til kurven fra produkt detajler*/
/**/
function addToBasketFromDetails() {
    if (sessionStorage.getItem('loggedin')) { //Tilføj kun til kurv hvis brugeren er logget ind
        let bearer_token = sessionStorage.getItem('bearer');
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let product_id = urlParams.get('id');
        let quantity_value = document.getElementById('product-quantity').value;
        let formData = new FormData()
        formData.append('product_id', product_id)
        formData.append('quantity', quantity_value)
        fetch('https://api.mediehuset.net/stringsonline/cart', {
                method: "POST",
                headers: {
                    'Authorization': "Bearer " + bearer_token
                },
                body: formData,
            })
            .then(response => response.json())
            .then(function () {
                location.href = "kurv.html";
            })
    } else {
        alert("Du skal være logget ind for at kunne tilføje til kurv");
    }
}