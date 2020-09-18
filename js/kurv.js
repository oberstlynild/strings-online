let page_basket_content = document.getElementsByClassName('page-content')[0];

/**/
/*Funktion til at fetch indhold af kurven og vise på siden*/
/**/
function fetchKurv() {
    let bearer_token = sessionStorage.getItem('bearer');
    fetch('https://api.mediehuset.net/stringsonline/cart', {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function (data) {
            if (data.status == false) {
                let ingen_kurv_header = document.createElement('h2');
                ingen_kurv_header.setAttribute('class', 'ingen-kurv-header');
                ingen_kurv_header.innerHTML = "Hovsa!";
                page_basket_content.appendChild(ingen_kurv_header);

                let ingen_kurv_description = document.createElement('p');
                ingen_kurv_description.setAttribute('class', 'ingen-kurv-description');
                ingen_kurv_description.innerHTML = "Der er ingen varer i din kurv.";
                page_basket_content.appendChild(ingen_kurv_description);
            } else {
                let total_price_value = 0;

            for (i = 0; i < data.cartlines.length; i++) {
                let basket_item = document.createElement('div');
                basket_item.setAttribute('class', 'basket-item');

                let basket_item_left = document.createElement('div');
                basket_item_left.setAttribute('class', 'basket-item-left');

                let basket_item_image = document.createElement('img');
                basket_item_image.setAttribute('class', 'basket-item-image');
                basket_item_image.src = data.cartlines[i].image_fullpath;
                basket_item_left.appendChild(basket_item_image);

                let basket_item_title = document.createElement('p');
                basket_item_title.setAttribute('class', 'basket-item-title');
                basket_item_title.innerHTML = data.cartlines[i].name;
                basket_item_left.appendChild(basket_item_title);

                let basket_item_right = document.createElement('div');
                basket_item_right.setAttribute('class', 'basket-item-right');

                let basket_item_antal_tekst = document.createElement('p');
                basket_item_antal_tekst.innerHTML = "Antal: ";
                basket_item_antal_tekst.setAttribute('class', 'basket-item-antal-tekst');
                basket_item_right.appendChild(basket_item_antal_tekst);

                let basket_item_antal_minus = document.createElement('button');
                basket_item_antal_minus.setAttribute('class', 'basket-quantity');
                basket_item_antal_minus.setAttribute('onclick', 'removeQuantity("' + data.cartlines[i].product_id + '","' + data.cartlines[i].quantity + '")');
                basket_item_antal_minus.innerHTML = "-";
                basket_item_right.appendChild(basket_item_antal_minus);

                let basket_item_antal_quantity = document.createElement('button');
                basket_item_antal_quantity.setAttribute('class', 'basket-quantity');
                basket_item_antal_quantity.setAttribute('id', 'basket-quantity-antal')
                basket_item_antal_quantity.innerHTML = data.cartlines[i].quantity;
                basket_item_right.appendChild(basket_item_antal_quantity);

                let basket_item_antal_plus = document.createElement('button');
                basket_item_antal_plus.setAttribute('class', 'basket-quantity');
                basket_item_antal_plus.setAttribute('onclick', 'addQuantity("' + data.cartlines[i].product_id + '","' + data.cartlines[i].quantity + '")');
                basket_item_antal_plus.innerHTML = "+";
                basket_item_right.appendChild(basket_item_antal_plus);

                let basket_item_price = document.createElement('button');
                basket_item_price.setAttribute('class', 'basket-item-price');
                if (data.cartlines[i].offerprice !== 0.00) {
                    let current_product_price = (data.cartlines[i].price * data.cartlines[i].quantity); //ganger pris med antal af produkt
                    basket_item_price.innerHTML = "DKK: " + current_product_price;
                    total_price_value += parseFloat(current_product_price);
                } else {
                    let current_product_price = (data.cartlines[i].offerprice * data.cartlines[i].quantity);
                    basket_item_price.innerHTML = "DKK: " + data.cartlines[i].offerprice
                    total_price_value += parseFloat(current_product_price);
                }
                basket_item_right.appendChild(basket_item_price);

                let basket_item_cancel = document.createElement('button');
                basket_item_cancel.setAttribute('class', 'basket-item-cancel');
                basket_item_cancel.setAttribute('onclick', 'cancelBasketItem("' + data.cartlines[i].id + '")');
                basket_item_cancel.innerHTML = "X";
                basket_item_right.appendChild(basket_item_cancel);

                basket_item.appendChild(basket_item_left);
                basket_item.appendChild(basket_item_right);

                page_basket_content.appendChild(basket_item);
            }

            let total_price_tekst = document.createElement('p');
            total_price_tekst.innerHTML = 'BELØB: DKK ' + total_price_value;
            total_price_tekst.setAttribute('class', 'total-pris');
            page_basket_content.appendChild(total_price_tekst);

            let total_price_moms = document.createElement('p');
            total_price_moms.innerHTML = "Prisen er inkl. moms";
            total_price_moms.setAttribute('class', 'total-pris-moms')
            page_basket_content.appendChild(total_price_moms);

            let cancel_all_basket = document.createElement('button');
            cancel_all_basket.innerHTML = "Ryd";
            cancel_all_basket.setAttribute('class', 'cancel-all-basket');
            cancel_all_basket.setAttribute('onclick', 'emptyBasket()');
            page_basket_content.appendChild(cancel_all_basket);

            let til_kassen = document.createElement('button');
            til_kassen.innerHTML = "TIL KASSEN";
            til_kassen.setAttribute('class', 'til-kassen-knap');
            til_kassen.setAttribute('onclick', 'tilKassen()');
            page_basket_content.appendChild(til_kassen);
            }
        
        })
}

/**/
/*Funktion til at fjerne et item fra kurven/
/**/
function cancelBasketItem(id) {
    let bearer_token = sessionStorage.getItem('bearer');

    fetch('https://api.mediehuset.net/stringsonline/cart/' + id, {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function () {
            location.href = "kurv.html";
        })
}

/**/
/*Funktion til at fjerne alt i kurven*/
/**/
function emptyBasket() {
    let bearer_token = sessionStorage.getItem('bearer');

    fetch('https://api.mediehuset.net/stringsonline/cart', {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function () {
            location.href = "kurv.html";
        })
}

/**/
/*Funktion til at redirect til kassen hvis der trykkes på knappen*/
/**/
function tilKassen() {
    location.href="kassen.html";
}

/**/
/*Funktion til at tilføje antal af er produkt*/
/**/
function addQuantity(product_id, quantity) {
    let bearer_token = sessionStorage.getItem('bearer');
    let added_quantity = (parseInt(quantity) + 1);

    let formData = new URLSearchParams();
    //let formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('field', 'quantity');
    formData.append('value', added_quantity);

    fetch('https://api.mediehuset.net/stringsonline/cart', {
            method: "PATCH",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
            body: formData,
        })
        .then(response => response.json())
        .then(function(data){
            location.href="";
        })
}

/**/
/*Funktion til at fjerne antal af et produkt*/
/**/
function removeQuantity(product_id, quantity) {

    let bearer_token = sessionStorage.getItem('bearer');
    let added_quantity = (parseInt(quantity) - 1);

    let formData = new URLSearchParams();
    //let formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('field', 'quantity');
    formData.append('value', added_quantity);

    fetch('https://api.mediehuset.net/stringsonline/cart', {
            method: "PATCH",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
            body: formData,
        })
        .then(response => response.json())
        .then(function(data){
            location.href="";
        })
}