let orderhistorik_page_content = document.getElementsByClassName('page-content')[0];

/**/
/*Funktion til at fetche ordrehistorik*/
/**/
function fetchOrderHistory() {
    let bearer_token = sessionStorage.getItem('bearer');
    fetch('https://api.mediehuset.net/stringsonline/orders', {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function (data) {
            let orderhistorik_grid = document.createElement('div');
            orderhistorik_grid.setAttribute('id', 'orderhistorik-grid');

            let orderhistorik_content = document.createElement('div');
            orderhistorik_content.setAttribute('id', 'orderhistorik-content');

            for (i = 0; i < data.count; i++) {
                let order_item = document.createElement('div');
                order_item.setAttribute('class', 'order-item');

                let order_item_date_wrapper = document.createElement('div');
                order_item_date_wrapper.setAttribute('class', 'order-item-date-wrapper');
                let order_item_date = document.createElement('p');
                order_item_date.setAttribute('class', 'order-item-date');

                //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
                //Ændre timestamp om til en dansk og real dato
                let new_date = new Date(data.items[i].created * 1000);
                let months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'July', 'August', 'September', 'Oktober', 'November', 'December'];
                let year = new_date.getFullYear();
                let month = months[new_date.getMonth()];
                let date = new_date.getDate();
                let time = date + ". " + month + " " + year;
                order_item_date.innerHTML = time;
                order_item_date_wrapper.appendChild(order_item_date);
                order_item.appendChild(order_item_date_wrapper);

                let order_item_price_wrapper = document.createElement('div');
                order_item_price_wrapper.setAttribute('class', 'order-item-price-wrapper');
                let order_item_price = document.createElement('p');
                order_item_price.setAttribute('class', 'order-item-price');
                order_item_price.setAttribute('id', 'order-item-' + data.items[i].id);
                order_item_price_wrapper.appendChild(order_item_price);
                order_item.appendChild(order_item_price_wrapper);

                let order_item_ordrenr_wrapper = document.createElement('div');
                order_item_ordrenr_wrapper.setAttribute('class', 'order-item-ordrenr-wrapper');
                let order_item_ordrenr = document.createElement('p');
                order_item_ordrenr.setAttribute('class', 'order-item-ordrenr');
                order_item_ordrenr.innerHTML = 'Ordrenr. <span class="orderhistorik-ordrenr-span">' + data.items[i].id + '</span>';
                order_item_ordrenr_wrapper.appendChild(order_item_ordrenr);
                order_item.appendChild(order_item_ordrenr_wrapper);

                orderhistorik_content.appendChild(order_item);

                fixOrderPrice(data.items[i].id); //Sætter den rigtige ordrepris ind
            }

            let orderhistorik_faker = document.createElement('div'); //laves for at tilpasse grid
            orderhistorik_grid.appendChild(orderhistorik_content);
            orderhistorik_grid.appendChild(orderhistorik_faker);
            orderhistorik_page_content.appendChild(orderhistorik_grid);
        })
}

/**/
/*Funktion til at ændre ordrepris fordi den ikke er i forhenværende fetch??*/
/**/
function fixOrderPrice(id) {
    let bearer_token = sessionStorage.getItem('bearer');
    fetch('https://api.mediehuset.net/stringsonline/orders/' + id, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function (data) {
            let order_all_price = 0;

            for (i=0; i<data.order.orderlines.length; i++) {
                let now_order_item_price = (data.order.orderlines[i].price * data.order.orderlines[i].quantity); //ganger pris med antal af produkt
                order_all_price += parseFloat(now_order_item_price);
            }
            document.getElementById('order-item-' + data.order.id).innerHTML = 'DKK ' + order_all_price;
        })
}