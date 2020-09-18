let page_content = document.getElementsByClassName('page-content')[0];
let breadcrump = document.getElementById('breadcrump-dynamic');

/*Finder venstre menu i HTML filen*/
let left_nav_wrapper = document.getElementsByClassName('page-nav')[0];

/*Fetcher og indsætter dynamisk indhold til venstre menuen*/
function createLeftNav() {
    fetch('https://api.mediehuset.net/stringsonline/')
        .then(response => response.json())
        .then(function (data) {
            /*Laver en UL wrapper til alle produkt kategorier*/
            let outer_ul = document.createElement('ul');
            outer_ul.setAttribute('class', 'page-nav-outer-ul');
            outer_ul.setAttribute('id', 'page-nav-outer-ul');

            /*Finder hver enkelte titel til hovedkategorierne, opretter som li element og indsætter i html*/
            for (i = 0; i < data.productgroups.count; i++) {
                let productgroup_li = document.createElement('li');
                productgroup_li.innerHTML = data.productgroups.items[i].title;
                productgroup_li.setAttribute('class', 'page-nav-main-group');
                productgroup_li.setAttribute('title', data.productgroups.items[i].title);
                productgroup_li.setAttribute('onclick', 'dropdownNav(this)'); //Sætter dropdown funktion på alle hovedtitler

                let inner_ul = document.createElement('ul');
                inner_ul.setAttribute('class', 'page-nav-subgroup');

                /*Finder hver enkelte underkategori og indsætter*/
                for (subgroup_index = 0; subgroup_index < data.productgroups.items[i].subgroups.length; subgroup_index++) {
                    let subgroup_li = document.createElement('li');
                    subgroup_li.innerHTML = data.productgroups.items[i].subgroups[subgroup_index].title;
                    subgroup_li.setAttribute('class', 'subgruppe-li');
                    subgroup_li.setAttribute('onclick', 'fetchCategory("' + data.productgroups.items[i].subgroups[subgroup_index].request.url + '"), styleSubgroup(this)');
                    inner_ul.appendChild(subgroup_li);
                    productgroup_li.appendChild(inner_ul);
                }
                outer_ul.appendChild(productgroup_li);
            }
            left_nav_wrapper.appendChild(outer_ul);
            fetchBrands();
        })
}

/**/
/*Funktion til at fetch brands til venstre navigation/
/**/
function fetchBrands() {
    fetch('https://api.mediehuset.net/stringsonline/brands')
        .then(response => response.json())
        .then(function (data) {
            let page_nav_outer_ul = document.getElementsByClassName('page-nav-outer-ul')[0];

            let brands_li = document.createElement('li');
            brands_li.setAttribute('class', 'page-nav-main-group');
            brands_li.setAttribute('title', 'Brands');
            brands_li.setAttribute('onclick', 'dropdownNav(this)');
            brands_li.innerHTML = "Brands";

            let inner_ul = document.createElement('ul');
            inner_ul.setAttribute('class', 'page-nav-subgroup');

            for (i = 0; i < data.items.length; i++) {
                let brands_subgroup = document.createElement('li');
                brands_subgroup.innerHTML = data.items[i].title;
                brands_subgroup.setAttribute('class', 'subgruppe-li');
                brands_subgroup.setAttribute('onclick', 'fetchBrand("' + data.items[i].request.url + '"), styleSubgroup(this)'); //Sætter onclick event på HTML object med data fra APIen
                inner_ul.appendChild(brands_subgroup);
            }

            brands_li.appendChild(inner_ul);
            page_nav_outer_ul.appendChild(brands_li);
        })
}

/**/
/*Funktion til at dropdown menuer i venstre navbar*/
/**/
function dropdownNav(product_group) {
    breadcrump.innerHTML = '<span class="breadcrump-slash">/</span> ' + product_group.title
    /*Fjerner eventuelt hvid farve fra main nav*/
    let main_navs = document.getElementsByClassName('page-nav-main-group');
    for (i = 0; i < main_navs.length; i++) {
        main_navs[i].style.color = "#00F9B6";
    }
    /*Fjerner eventuelt open dropdown*/
    let sub_navs = document.getElementsByClassName('page-nav-subgroup');
    for (i = 0; i < sub_navs.length; i++) {
        sub_navs[i].style.display = "none";
        sub_navs[i].style.color = "#00F9B6";
    }

    product_group.style.color = "white";
    product_group.childNodes[1].style.display = "block";
}

/**/
/*Funktion til at style undermenuerne i venstre navbar*/
/**/
function styleSubgroup(subgroup) {
    let sub_navs = document.getElementsByClassName('subgruppe-li');
    for (i = 0; i < sub_navs.length; i++) {
        sub_navs[i].style.color = "#00F9B6";
    }
    subgroup.style.color = "white";
}

/**/
/*Funktion til at style undermenuer hvis der ingen undermenuer er(luk andre menuer)*/
/**/
function fetchNoSubgroup(no_sub_group) {
    /*Fjerner eventuelt hvid farve fra main nav*/
    let main_navs = document.getElementsByClassName('page-nav-main-group');
    for (i = 0; i < main_navs.length; i++) {
        main_navs[i].style.color = "#00F9B6";
    }
    /*Fjerner eventuelt open dropdown*/
    let sub_navs = document.getElementsByClassName('page-nav-subgroup');
    for (i = 0; i < sub_navs.length; i++) {
        sub_navs[i].style.display = "none";
        sub_navs[i].style.color = "#00F9B6";
    }
    no_sub_group.style.color = "white";
}

/**/
/*Funktion til at sortere produkter som er valgt frem/
/**/
function sortDivs(sort_value) {
    //INGEN VALUE GØR INGENTING
    if (sort_value == 0) {

    }
    //SORTER EFTER PRIS LAV
    if (sort_value == 1) {
        let product_price_elements = document.getElementsByClassName('product-price');
        let product_item_elements = document.getElementsByClassName('product-item');

        for (i = 0; i < product_price_elements.length; i++) {
            current_price = parseInt(product_price_elements[i].dataset.price);
            product_item_elements[i].style.order = current_price;
        }
        document.getElementById('product-items').style.flexDirection = "column"; //vender order normal 
    }
    //SORTER EFTER PRIS HØJ
    if (sort_value == 2) {
        let product_price_elements = document.getElementsByClassName('product-price');
        let product_item_elements = document.getElementsByClassName('product-item');

        for (i = 0; i < product_price_elements.length; i++) {
            current_price = parseInt(product_price_elements[i].dataset.price);
            product_item_elements[i].style.order = current_price;
        }
        document.getElementById('product-items').style.flexDirection = "column-reverse"; //vender order omvendt
    }
    //SORTER EFTER ALFABET A-Å
    if (sort_value == 3) {
        let product_item_elements = document.getElementsByClassName('product-item'); //Finder alle elementer på siden med klassen 'product-item'
        let product_titles = []; //opretter tomt array
        document.getElementById('product-items').style.flexDirection = "column";  //Vender flex visning på siden normalt, hvis 'hvis pris høj' har haft vendt den omvendt
        for (i=0; i<product_item_elements.length; i++) { //looper alle produkt items igennem og pusher deres data-title attribut in i et array
            product_titles.push(product_item_elements[i].dataset.title);
        }
        product_titles_sorted = product_titles.sort(); //Sortere array efter alfabet
        for (i=0; i<product_titles_sorted.length; i++) { //Looper items igennem der antal gange, der er titles, for at finde de divs, der har samme navn i data-title attribut som i mit array
            let current_item = document.querySelectorAll('[data-title="' + product_titles_sorted[i] + '"]');
            for (index=0; index<current_item.length; index++) { //sætter flex order på de divs, der er fundet først fra arrayet (i alfabetisk rækkefølge)
                current_item[index].style.order=index
            }
        }
    }
    //SORTER EFTER ALFABET Å-A
    if (sort_value == 4) {
        let product_item_elements = document.getElementsByClassName('product-item'); //Finder alle elementer på siden med klassen 'product-item'
        let product_titles = []; //opretter tomt array
        document.getElementById('product-items').style.flexDirection = "column-reverse";  //Vender flex visning på siden normalt, hvis 'hvis pris høj' har haft vendt den omvendt
        for (i=0; i<product_item_elements.length; i++) { //looper alle produkt items igennem og pusher deres data-title attribut in i et array
            product_titles.push(product_item_elements[i].dataset.title);
        }
        product_titles_sorted = product_titles.sort(); //Sortere array efter alfabet
        for (i=0; i<product_titles_sorted.length; i++) { //Looper items igennem der antal gange, der er titles, for at finde de divs, der har samme navn i data-title attribut som i mit array
            let current_item = document.querySelectorAll('[data-title="' + product_titles_sorted[i] + '"]');
            for (index=0; index<current_item.length; index++) { //sætter flex order på de divs, der er fundet først fra arrayet (i alfabetisk rækkefølge)
                current_item[index].style.order=index
            }
        }
    }
    //SORTER EFTER BRAND
    if (sort_value == 5) { //Option 'brand' i dropdown på siden har value 5
        let product_item_elements = document.getElementsByClassName('product-item'); //Finder alle elementer på siden med klassen 'product-item'
        let product_brands = []; //opretter tomt array
        document.getElementById('product-items').style.flexDirection = "column";  //Vender flex visning på siden normalt, hvis 'hvis pris høj' har haft vendt den omvendt

        for (i=0; i<product_item_elements.length; i++) { //looper alle produkt items igennem og pusher deres data-brand attribut in i et array
            product_brands.push(product_item_elements[i].dataset.brand);
        }

        product_brands_sorted = product_brands.sort(); //Sortere array efter alfabet
        let unique_brands_sorted = [...new Set(product_brands_sorted)]; //Fjerner dupliketter fra array

        for (i=0; i<unique_brands_sorted.length; i++) { //Looper items igennem der antal gange, der er brands, for at finde de divs, der har samme navn i data-brand attribut som i mit array
            let current_item = document.querySelectorAll('[data-brand="' + unique_brands_sorted[i] + '"]');
            for (index=0; index<current_item.length; index++) { //sætter flex order på de divs, der er fundet først fra arrayet (i alfabetisk rækkefølge)
                current_item[index].style.order=i
            }
        }
    }
}

/**/
/*Funktion til at fetch produkter udfra hvilken kategori der er valgt i venstre menu */
/**/
function fetchCategory(request_url) {
    fetch(request_url)
        .then(response => response.json())
        .then(function (data) {
            page_content.innerHTML = "";

            let sortBySelecter = document.createElement('select');
            sortBySelecter.setAttribute('class', 'select-css')
            sortBySelecter.setAttribute('onchange', 'sortDivs(value)');

            let option_sort_by_text = document.createElement('option');
            option_sort_by_text.innerHTML = "Sorter efter..";
            option_sort_by_text.style.display="none";
            option_sort_by_text.value = "0";
            sortBySelecter.appendChild(option_sort_by_text);

            let option_low_price = document.createElement('option');
            option_low_price.innerHTML = "Lav pris";
            option_low_price.value = "1";
            sortBySelecter.appendChild(option_low_price);

            let option_high_price = document.createElement('option');
            option_high_price.innerHTML = "Høj pris";
            option_high_price.value = "2";
            sortBySelecter.appendChild(option_high_price);

            let option_alphabetAZ = document.createElement('option');
            option_alphabetAZ.innerHTML = "Alfabetisk A-Å";
            option_alphabetAZ.value = "3";
            sortBySelecter.appendChild(option_alphabetAZ);

            let option_alphabetZA = document.createElement('option');
            option_alphabetZA.innerHTML = "Alfabetisk Å-A";
            option_alphabetZA.value = "4";
            sortBySelecter.appendChild(option_alphabetZA);

            let option_brands = document.createElement('option');
            option_brands.innerHTML = "Brand";
            option_brands.value = "5";
            sortBySelecter.appendChild(option_brands);

            page_content.appendChild(sortBySelecter);

            let product_items = document.createElement('div');
            product_items.setAttribute('id', 'product-items');

            for (i = 0; i < data.group.products.length; i++) {
                let product_wrapper = document.createElement('div');
                product_wrapper.setAttribute('class', 'product-item');
                product_wrapper.setAttribute('data-title', data.group.products[i].name);
                product_wrapper.setAttribute('data-brand', data.group.products[i].brand);

                let product_image_wrapper = document.createElement('div');

                let product_image = document.createElement('img');
                product_image.src = data.group.products[i].image_fullpath;
                product_image.alt = data.group.products[i].description_short;
                product_image_wrapper.appendChild(product_image);
                product_wrapper.appendChild(product_image_wrapper);

                let product_description_wrapper = document.createElement('div');

                let product_title = document.createElement('h2');
                product_title.setAttribute('class', 'product-title');
                product_title.innerHTML = data.group.products[i].name;
                product_description_wrapper.appendChild(product_title);

                let product_description_short = document.createElement('p');
                product_description_short.innerHTML = data.group.products[i].description_short;
                let product_description_long_link = document.createElement('span');
                product_description_long_link.innerHTML = " Læs mere";
                product_description_long_link.setAttribute('onclick', 'productDetails("' + data.group.products[i].id + '")');
                product_description_short.appendChild(product_description_long_link);
                product_description_wrapper.appendChild(product_description_short);
                product_wrapper.appendChild(product_description_wrapper);

                let product_price_wrapper = document.createElement('div');

                let product_price = document.createElement('button');
                product_price.innerHTML = 'Pris: DKK ' + data.group.products[i].price;
                product_price.setAttribute('class', 'product-price');
                product_price.setAttribute('data-price', data.group.products[i].price);
                product_price_wrapper.appendChild(product_price);

                let product_basket = document.createElement('button');
                product_basket.innerHTML = "Læg i kurv";
                product_basket.setAttribute('class', 'product-basket');
                product_basket.setAttribute('onclick', 'addToBasket("' + data.group.products[i].id + '")');
                product_price_wrapper.appendChild(product_basket);

                let product_stock = document.createElement('p');
                product_stock.innerHTML = data.group.products[i].stock + " på lager";
                product_stock.setAttribute('class', 'product-stock');
                product_price_wrapper.appendChild(product_stock);
                product_wrapper.appendChild(product_price_wrapper);

                product_items.appendChild(product_wrapper);
            }
            page_content.appendChild(product_items);
        })
}

/**/
/*Funktion til er redirect dig til produkt detajler hvis der trykkes på læs mere*/
/**/
function productDetails(request_id) {
    location.href = "produkt.html?id=" + request_id;
}

/**/
/*Funktion til at fetche brands hvis den kategori vælges*/
/**/
function fetchBrand(request_url) {
    fetch(request_url)
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

            fetchBrandProducts(data.item.id);
        })
}

/**/
/*Funktion til at fetche brand produkter alt efter hvilken brand der er valgt i ventre menu*/
/**/
function fetchBrandProducts(id) {
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

/**/
/*Funktion til at tilføje et produkt til kurven*/
/**/
function addToBasket(id) {
    if (sessionStorage.getItem('loggedin')) {

        let product_id = id;
        let quantity = 1;
        let formData = new FormData();
        formData.append('product_id', product_id);
        formData.append('quantity', quantity);
        let bearer_token = sessionStorage.getItem('bearer');
        fetch('https://api.mediehuset.net/stringsonline/cart', {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': "Bearer " + bearer_token
                },
            })
            .then(response => response.json())
            .then(function () {
                location.href = "kurv.html";
            })
    } else {
        alert('Du skal være logget ind for at være kunne tilføje til kurv');
    }
}