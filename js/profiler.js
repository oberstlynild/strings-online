/**/
/*Funktion til at holde øje med om du er logget ind og ændre siden alt efter det*/
/**/
if (sessionStorage.getItem('loggedin')) { //tjekker om der er logget ind og retter navbar samt indkøbskurv alt efter det
    document.getElementsByClassName('nav-login')[0].innerHTML = "Log ud";
    document.getElementsByClassName('nav-login-href')[0].href = "logud.html";
    let shopping_basket = document.createElement('p');
    shopping_basket.innerHTML = '<i class="fas fa-shopping-basket"></i>';
    shopping_basket.setAttribute('onclick', 'location.href="kurv.html"');
    document.getElementsByClassName('top-info')[0].appendChild(shopping_basket);
    let bearer_token = sessionStorage.getItem('bearer');
    fetch('https://api.mediehuset.net/stringsonline/cart', {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function (data) {
            let shopping_basket_items_wrapper = document.createElement('div');
            shopping_basket_items_wrapper.setAttribute('class', 'shopping-basket-items-wrapper')
            shopping_basket_items_wrapper.setAttribute('onclick', 'location.href="kurv.html"');
            let shopping_basket_items = document.createElement('p');
            shopping_basket_items.innerHTML = data.cartlines.length;
            shopping_basket_items.setAttribute('class', 'shopping-basket-items');
            shopping_basket_items.setAttribute('onclick', 'location.href="kurv.html"');
            shopping_basket_items_wrapper.appendChild(shopping_basket_items);
            document.getElementsByClassName('top-info')[0].appendChild(shopping_basket_items_wrapper);
        })
}

/**/
/*Funktion til at logge dig ud med*/
/**/
function logUd() { //funktion til at logge ud hvis der trykkes på den efter at være logger ind
    sessionStorage.removeItem('loggedin');
    location.href = "login.html";
}