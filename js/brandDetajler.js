function fetchBrandDetajler() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let data_id = urlParams.get('id');
    fetch('https://api.mediehuset.net/stringsonline/brands/' + data_id, { //fetch produkt med id fra url
            method: "GET",
        })
        .then(response => response.json())
        .then(function (data) {
            page_content.innerHTML = "";
            let brand_header = document.createElement('h1');
            brand_header.innerHTML = data.item.title;
            brand_header.setAttribute('class', 'brand-header');

            let brand_description = document.createElement('p');
            brand_description.innerHTML = data.item.description;
            brand_description.setAttribute('class', 'brand-description');


            page_content.appendChild(brand_header);
            page_content.appendChild(brand_description);

            fetchBrandProductsSearch(data.item.id);
        })
}

/**/
/*Funktion til at fetche brand produkter alt efter hvilken brand der er valgt i ventre menu*/
/**/
function fetchBrandProductsSearch(id) {
    fetch('https://api.mediehuset.net/stringsonline/brands/' + id)
        .then(response => response.json())
        .then(function (data) {
            let brand_products_title = document.createElement('h2');
            brand_products_title.setAttribute('id', 'brand-products-title');
            brand_products_title.innerHTML = data.item.title + ' produkter';
            page_content.appendChild(brand_products_title);

            let product_items = document.createElement('div');
            product_items.setAttribute('id', 'product-items');

            for (i = 0; i < data.item.products.length; i++) {
                let product_wrapper = document.createElement('div');
                product_wrapper.setAttribute('class', 'product-item');

                let product_image_wrapper = document.createElement('div');

                let product_image = document.createElement('img');
                product_image.src = data.item.products[i].image_fullpath;
                product_image.alt = data.item.products[i].description_short;
                product_image_wrapper.appendChild(product_image);
                product_wrapper.appendChild(product_image_wrapper);

                let product_description_wrapper = document.createElement('div');
                let product_title = document.createElement('h2');
                product_title.innerHTML = data.item.products[i].name;
                product_description_wrapper.appendChild(product_title);

                let product_description_short = document.createElement('p');
                product_description_short.innerHTML = data.item.products[i].description_short;
                let product_description_long_link = document.createElement('span');
                product_description_long_link.innerHTML = " Læs mere";
                product_description_long_link.setAttribute('onclick', 'productDetails("' + data.item.products[i].id + '")');
                product_description_short.appendChild(product_description_long_link);
                product_description_wrapper.appendChild(product_description_short);
                product_wrapper.appendChild(product_description_wrapper);

                let product_price_wrapper = document.createElement('div');

                let product_price = document.createElement('button');
                product_price.innerHTML = 'Pris: DKK ' + data.item.products[i].price;
                product_price.setAttribute('class', 'product-price');
                product_price_wrapper.appendChild(product_price);

                let product_basket = document.createElement('button');
                product_basket.innerHTML = "Læg i kurv";
                product_basket.setAttribute('class', 'product-basket');
                product_basket.setAttribute('onclick', 'addToBasket("' + data.item.products[i].id + '")');
                product_price_wrapper.appendChild(product_basket);

                let product_stock = document.createElement('p');
                product_stock.innerHTML = data.item.products[i].stock + " på lager";
                product_stock.setAttribute('class', 'product-stock');
                product_price_wrapper.appendChild(product_stock);
                product_wrapper.appendChild(product_price_wrapper);

                product_items.appendChild(product_wrapper);
            }
            page_content.appendChild(product_items);
        })
}