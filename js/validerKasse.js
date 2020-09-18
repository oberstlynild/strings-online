/*Fjerner submit funktion fra kasseform*/
let kasse_form = document.getElementById("kasse-form");

function handleForm(event) {
    event.preventDefault();
}
kasse_form.addEventListener('submit', handleForm);

let kasse_content = document.getElementsByClassName('page-content')[0]; //tilføjer html content som variabel
let delivery_content_shown = false; //siger at der ikke er valgt nogen anden leveringsaddresse


/**/
/*Funktion til at validere kassen*/
/**/
function validerKassen() {
    /*henter values fra html input felter*/
    let firstname_value = document.getElementById('kasse-fornavn').value;
    let lastname_value = document.getElementById('kasse-efternavn').value;
    let address_value = document.getElementById('kasse-adresse').value;
    let zipcode_value = document.getElementById('kasse-postnr').value;
    let city_value = document.getElementById('kasse-by').value;
    let email_value = document.getElementById('kasse-email').value;
    let phone_value = document.getElementById('kasse-tlfnr').value;
    let payment = document.getElementById('kasse-betalingsmetode');
    let address_other_value = document.getElementById('kasse-adresse-anden').value;
    let zipcode_other_value = document.getElementById('kasse-postnr-anden').value;
    let city_other_value = document.getElementById('kasse-by-anden').value;
    /*sætter variabler som senere ændres alt efter om validering af input felter er ok*/
    let firstname_validated;
    let lastname_validated;
    let address_validated;
    let zipcode_validated;
    let city_validated;
    let email_validated;
    let phone_validated;
    let payment_validated;
    let address_other_validated;
    let zipcode_other_validated;
    let city_other_validated;

    /*En masse valideringer - først validering er beskrevet detaljeret*/
    //FORNAVN
    if (!/^[A-Za-zæøåÆØÅ ]+$/.test(firstname_value)) { //Hvis ikke RegEx som kun acceptere bogstaver og mellemrum til navn, så viser den på siden, hvor der er en misvalidering.
        document.getElementById('kasse-fornavn').value = "* Kun bogstaver i fornavn!"; //"Kun bogstaver i navn" på valideringsfeltet navn
        document.getElementById('kasse-fornavn').classList.add('red-input'); //Rød skrift i valideringsfeltet navn
        firstname_validated = 0; //Sætter valideringen af feltet til falsk
    } else { //Hvis ReqEx er overholdt så sæt validering til sand og fjern rød farve i tilfælde af den var sat
        document.getElementById('kasse-fornavn').classList.remove('red-input'); //Fjerner rød farve
        firstname_validated = 1; //Sætter validering til sand
    }
    //EFTERNAVN
    if (!/^[A-Za-zæøåÆØÅ ]+$/.test(lastname_value)) {
        document.getElementById('kasse-efternavn').value = "* Kun bogstaver i efternavn!";
        document.getElementById('kasse-efternavn').classList.add('red-input');
        lastname_validated = 0;
    } else {
        document.getElementById('kasse-efternavn').classList.remove('red-input');
        lastname_validated = 1;
    }
    //ADDRESSE
    if ((address_value)) {
        let letmatch = address_value.match(/[a-z]/g); //RegEx som variabel i stedet (prøver noget nyt)
        let digmatch = address_value.match(/[0-9]/g);

        if (letmatch && digmatch) {
            if (!/^[0-9A-Za-zæøåÆØÅ., ]+$/.test(address_value)) {
                document.getElementById('kasse-adresse').value = "* Minimum bogstaver og tal i adresse!";
                document.getElementById('kasse-adresse').classList.add('red-input');
                address_validated = 0;
            } else {
                document.getElementById('kasse-adresse').classList.remove('red-input');
                address_validated = 1;
            }
        } else {
            document.getElementById('kasse-adresse').value = "* Minimum bogstaver og tal i adresse!";
            document.getElementById('kasse-adresse').classList.add('red-input');
            address_validated = 0;
        }
    } else {
        document.getElementById('kasse-adresse').value = "* Minimum bogstaver og tal i adresse!";
        document.getElementById('kasse-adresse').classList.add('red-input');
        address_validated = 0;
    }
    //POSTNR
    if (!/^[0-9]+$/.test(zipcode_value) || zipcode_value.length !== 4) {
        document.getElementById('kasse-postnr').value = "* Kun tal og præcis 4 cifre i postnummer!";
        document.getElementById('kasse-postnr').classList.add('red-input');
        zipcode_validated = 0;
    } else {
        document.getElementById('kasse-postnr').classList.remove('red-input');
        zipcode_validated = 1;
    }
    //BY
    if (!/^[A-Za-zæøåÆØÅ., ]+$/.test(city_value)) {
        document.getElementById('kasse-by').value = "* Kun bogstaver i by!";
        document.getElementById('kasse-by').classList.add('red-input');
        city_validated = 0;
    } else {
        document.getElementById('kasse-by').classList.remove('red-input');
        city_validated = 1;
    }
    //ANDEN LEVERING
    if (delivery_content_shown == true) { //Anden levering sættes til true hvis knappen 'anden levering' fra html bliver trykket på (bliver sat til falsk hvis man trykker igen)
        //ANDEN ADDRESSE
        if ((address_other_value)) {
            let letmatch = address_other_value.match(/[a-z]/g);
            let digmatch = address_other_value.match(/[0-9]/g);

            if (letmatch && digmatch) {
                if (!/^[0-9A-Za-zæøåÆØÅ., ]+$/.test(address_other_value)) {
                    document.getElementById('kasse-adresse-anden').value = "* Minimum bogstaver og tal i adresse!";
                    document.getElementById('kasse-adresse-anden').classList.add('red-input');
                    address_other_validated = 0;
                } else {
                    document.getElementById('kasse-adresse-anden').classList.remove('red-input');
                    address_other_validated = 1;
                }
            } else {
                document.getElementById('kasse-adresse-anden').value = "* Minimum bogstaver og tal i adresse!";
                document.getElementById('kasse-adresse-anden').classList.add('red-input');
                address_other_validated = 0;
            }
        } else {
            document.getElementById('kasse-adresse-anden').value = "* Minimum bogstaver og tal i adresse!";
            document.getElementById('kasse-adresse-anden').classList.add('red-input');
            address_other_validated = 0;
        }
        //ANDEN POSTNR
        if (!/^[0-9]+$/.test(zipcode_other_value) || zipcode_other_value.length !== 4) {
            document.getElementById('kasse-postnr-anden').value = "* Kun tal og præcis 4 cifre i postnummer!";
            document.getElementById('kasse-postnr-anden').classList.add('red-input');
            zipcode_other_validated = 0;
        } else {
            document.getElementById('kasse-postnr-anden').classList.remove('red-input');
            zipcode_other_validated = 1;
        }
        //ANDEN BY
        if (!/^[A-Za-zæøåÆØÅ., ]+$/.test(city_other_value)) {
            document.getElementById('kasse-by-anden').value = "* Kun bogstaver i by!";
            document.getElementById('kasse-by-anden').classList.add('red-input');
            city_other_validated = 0;
        } else {
            document.getElementById('kasse-by-anden').classList.remove('red-input');
            city_other_validated = 1;
        }
    }
    //EMAIL
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_value)) { //RegEx hentet fra nettet
        document.getElementById('kasse-email').value = "* Forkert email format!";
        document.getElementById('kasse-email').classList.add('red-input');
        email_validated = 0;
    } else {
        document.getElementById('kasse-email').classList.remove('red-input');
        email_validated = 1;
    }
    //TELEFON
    if (!/^[0-9]+$/.test(phone_value) || phone_value.length != 8) {
        document.getElementById('kasse-tlfnr').value = "* Præcis 8 cifre i telefonnummer! Ingen landekode eller mellemrum, kun tal";
        document.getElementById('kasse-tlfnr').classList.add('red-input');
        phone_validated = 0;
    } else {
        document.getElementById('kasse-tlfnr').classList.remove('red-input');
        phone_validated = 1;
    }
    //PAYMENT VALGT
    if (payment.checked == false) {
        document.getElementById('betalingsmetode-bank').innerHTML = "* Vælg betalingsmetode";
        document.getElementById('betalingsmetode-bank').classList.add('red-input');
        payment_validated = 0;
    } else {
        document.getElementById('betalingsmetode-bank').innerHTML = "Bankoverførsel";
        document.getElementById('betalingsmetode-bank').classList.remove('red-input');
        payment_validated = 1;
    }
    /*VALIDERINGER SLUT*/

    if (delivery_content_shown == true) { //Kun hvis der er trykket på anden levering i HTML
        //Send kun ordrer hvis alle felter er valideret inklusig anden levering
        if ((firstname_validated == 1) && (lastname_validated == 1) && (address_validated == 1) && (zipcode_validated == 1) && (city_validated == 1) && (email_validated == 1) && (phone_validated == 1) && (payment_validated == 1) && (address_other_validated == 1) && (zipcode_other_validated == 1) && (city_other_validated == 1)) {
            kasse_content.innerHTML = ""; //Fjerner content fra html
            let tak_grid = document.createElement('div');
            tak_grid.setAttribute('id', 'tak-grid');
            /*Opbygger hele HTML dokumentet*/
            let order_container = document.createElement('div');
            order_container.setAttribute('id', 'order-container');
            //Tak knap
            let tak_knap = document.createElement('button');
            tak_knap.innerHTML = "TAK FOR DIN BESTILLING";
            tak_knap.setAttribute('id', 'order-tak-knap')
            order_container.append(tak_knap);
            //Adresse vej by container
            let adresse_container = document.createElement('div');
            adresse_container.setAttribute('id', 'adresse-container');
            //Adresse
            let faktureringsadresse_overskrift = document.createElement('h2');
            faktureringsadresse_overskrift.setAttribute('class', 'faktureringsadresse-overskrift');
            faktureringsadresse_overskrift.innerHTML = "Faktureringsadresse";
            adresse_container.appendChild(faktureringsadresse_overskrift);
            //Vej
            let fakturerings_vej = document.createElement('p');
            fakturerings_vej.setAttribute('class', 'fakturerings-underskrift');
            fakturerings_vej.innerHTML = address_value;
            adresse_container.appendChild(fakturerings_vej);
            //By
            let fakturerings_by = document.createElement('p');
            fakturerings_by.setAttribute('class', 'fakturerings-underskrift');
            fakturerings_by.innerHTML = zipcode_value + " " + city_value;
            adresse_container.appendChild(fakturerings_by);
            //Appender objekter til HTML
            tak_grid.appendChild(order_container);
            tak_grid.appendChild(adresse_container);
            kasse_content.append(tak_grid);
            //Kører funktion til at sende ordren afsted med anden levering
            sendOrderOtherDelivery(firstname_value, lastname_value, address_value, zipcode_value, city_value, email_value, address_other_value, zipcode_other_value, city_other_value);
        }
    } else { //Hvis anden levering IKKE er valgt
        //Så sender den orderen uden validering på anden levering (kommenteret ovenover MED anden levering (samme))
        if ((firstname_validated == 1) && (lastname_validated == 1) && (address_validated == 1) && (zipcode_validated == 1) && (city_validated == 1) && (email_validated == 1) && (phone_validated == 1) && (payment_validated == 1)) {
            kasse_content.innerHTML = "";

            let tak_grid = document.createElement('div');
            tak_grid.setAttribute('id', 'tak-grid');

            let order_container = document.createElement('div');
            order_container.setAttribute('id', 'order-container');

            let tak_knap = document.createElement('button');
            tak_knap.innerHTML = "TAK FOR DIN BESTILLING";
            tak_knap.setAttribute('id', 'order-tak-knap')
            order_container.append(tak_knap);

            let adresse_container = document.createElement('div');
            adresse_container.setAttribute('id', 'adresse-container');

            let faktureringsadresse_overskrift = document.createElement('h2');
            faktureringsadresse_overskrift.setAttribute('class', 'faktureringsadresse-overskrift');
            faktureringsadresse_overskrift.innerHTML = "Faktureringsadresse";
            adresse_container.appendChild(faktureringsadresse_overskrift);

            let fakturerings_vej = document.createElement('p');
            fakturerings_vej.setAttribute('class', 'fakturerings-underskrift');
            fakturerings_vej.innerHTML = address_value;
            adresse_container.appendChild(fakturerings_vej);

            let fakturerings_by = document.createElement('p');
            fakturerings_by.setAttribute('class', 'fakturerings-underskrift');
            fakturerings_by.innerHTML = zipcode_value + " " + city_value;
            adresse_container.appendChild(fakturerings_by);

            tak_grid.appendChild(order_container);
            tak_grid.appendChild(adresse_container);
            kasse_content.append(tak_grid);
            sendOrder(firstname_value, lastname_value, address_value, zipcode_value, city_value, email_value);
        }
    }
}

/**/
/*Funktion til er sendre ordren afsted uden anden levering*/
/**/
function sendOrder(firstname_value, lastname_value, address_value, zipcode_value, city_value, email_value) {
    let bearer_token = sessionStorage.getItem('bearer'); //Henter bearer token fra localstorage (gemt fra login.js)
    let formData = new FormData() //Laver en ny formdata

    //Appender alle de felter jeg skal bruge for at fetch api til formdataen
    formData.append('firstname', firstname_value)
    formData.append('lastname', lastname_value)
    formData.append('address', address_value)
    formData.append('zipcode', zipcode_value)
    formData.append('city', city_value)
    formData.append('email', email_value)
    formData.append('status', '1')
    formData.append('delivery_address', address_value)
    formData.append('delivery_zipcode', zipcode_value)
    formData.append('delivery_city', city_value)

    fetch('https://api.mediehuset.net/stringsonline/orders', { //Starter fetch
            method: "POST", //fetch med post
            headers: { //indsætter bearer token som header til fetch
                'Authorization': "Bearer " + bearer_token
            },
            body: formData, //sætter min formdata ind som body på fetch
        })
        .then(response => response.json()) //laver fetch data om til json
        .then(function (data) { //kører funktion med den data jeg har fra fetch
            if (data.status == false) { //hvis dataen fra fetch melder fejl fordi der ingen varer var i kurven, så ikke hvis nogen tak knap, men skriv at kurven var tom
                document.getElementById('order-container').style.border = "none";
                document.getElementById('order-tak-knap').style.display = "none";
                let hovsa_tekst = document.createElement('p');
                hovsa_tekst.setAttribute('class', 'hovsa-tekst');
                hovsa_tekst.innerHTML = '<span class="color-highlight">Hovsa!</span><br>Det ser ud som om, der ingen varer er, i din kurv!';
                document.getElementById('order-container').appendChild(hovsa_tekst);
                document.getElementById('adresse-container').innerHTML = "";
            } else { //ellers hvis dataen er god, så hvis de ting tak knappen skal bruge og sæt fetch anden funktion igang til at fetch ordrepriserne
                let order_nummer = document.createElement('p');
                order_nummer.setAttribute('class', 'product-ordernr');
                order_nummer.innerHTML = 'Ordrenr. <span class="color-highlight">' + data.order_id + '</span>';
                document.getElementById('order-container').appendChild(order_nummer);
                //Funktion til at fetch ordrepriserne
                fetchOrderPrices(data.order_id);
            }
        })
}

/**/
/*Funktion til er sendre ordren afsted med anden levering (kommenteret i funktionen ovenover)*/
/**/
function sendOrderOtherDelivery(firstname_value, lastname_value, address_value, zipcode_value, city_value, email_value, address_other_value, zipcode_other_value, city_other_value) {
    let bearer_token = sessionStorage.getItem('bearer');
    let formData = new FormData()
    formData.append('firstname', firstname_value)
    formData.append('lastname', lastname_value)
    formData.append('address', address_value)
    formData.append('zipcode', zipcode_value)
    formData.append('city', city_value)
    formData.append('email', email_value)
    formData.append('status', '1')
    formData.append('delivery_address', address_other_value)
    formData.append('delivery_zipcode', zipcode_other_value)
    formData.append('delivery_city', city_other_value)
    fetch('https://api.mediehuset.net/stringsonline/orders', {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
            body: formData,
        })
        .then(response => response.json())
        .then(function (data) {
            if (data.status == false) {
                document.getElementById('order-container').style.border = "none";
                document.getElementById('order-tak-knap').style.display = "none";
                let hovsa_tekst = document.createElement('p');
                hovsa_tekst.setAttribute('class', 'hovsa-tekst');
                hovsa_tekst.innerHTML = '<span class="color-highlight">Hovsa!</span><br>Det ser ud som om, der ingen varer er, i din kurv!';
                document.getElementById('order-container').appendChild(hovsa_tekst);
                document.getElementById('adresse-container').innerHTML = "";
            } else {
                let order_nummer = document.createElement('p');
                order_nummer.setAttribute('class', 'product-ordernr');
                order_nummer.innerHTML = 'Ordrenr. <span class="color-highlight">' + data.order_id + '</span>';
                document.getElementById('order-container').appendChild(order_nummer);
                fetchOrderPrices(data.order_id);
            }
        })
}

/**/
/*Funktion til at hende ordrepriserne ned fordi de ikke var i forhenværende fetch????*/
/**/
function fetchOrderPrices(request_id) {
    let bearer_token = sessionStorage.getItem('bearer');
    fetch('https://api.mediehuset.net/stringsonline/orders/' + request_id, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearer_token
            },
        })
        .then(response => response.json())
        .then(function (data) {
            let order_container = document.getElementById('order-container');
            let samlet_pris = 0; //Sætter samlet pris til 0, inkrementere senere hen i koden med +=
            for (i = 0; i < data.order.orderlines.length; i++) {
                //Laver HTML objecter og indsætter for 
                let order_product_item = document.createElement('div');
                order_product_item.setAttribute('class', 'order-product-item');

                let order_product_title = document.createElement('p');
                order_product_title.setAttribute('class', 'order-product-title');
                order_product_title.innerHTML = data.order.orderlines[i].name;
                order_product_item.appendChild(order_product_title);

                let order_product_quantity = document.createElement('p');
                order_product_quantity.setAttribute('class', 'order-product-quantity');
                order_product_quantity.innerHTML = 'Antal: <span class="color-highlight">' + data.order.orderlines[i].quantity + '</span>';
                order_product_item.appendChild(order_product_quantity);

                let order_product_price = document.createElement('p');
                order_product_price.setAttribute('class', 'order-product-price');
                order_product_price.innerHTML = 'Pris: <span class="color-highlight">' + data.order.orderlines[i].price + '</span>';
                order_product_item.appendChild(order_product_price);

                let order_current_product_price = (data.order.orderlines[i].price * data.order.orderlines[i].quantity); //ganger pris med antal af produkter for at få en samlet pris
                samlet_pris += parseFloat(order_current_product_price); //sikre mig dataen på prisen vil at lave matematik med javascript

                order_container.appendChild(order_product_item);
            }
            let samlet_pris_tekst = document.createElement('p');
            samlet_pris_tekst.setAttribute('class', 'samlet-pris-tekst');
            samlet_pris_tekst.innerHTML = 'SAMLET PRIS: <span class="color-highlight">' + samlet_pris + ' DKK</span>';
            order_container.appendChild(samlet_pris_tekst);

            let moms_pris = (samlet_pris * 0.25);
            let moms_pris_tekst = document.createElement('p');
            moms_pris_tekst.setAttribute('class', 'moms-pris-tekst');
            moms_pris_tekst.innerHTML = 'Moms: <span class="color-highlight">' + moms_pris + ' DKK</span>'
            order_container.appendChild(moms_pris_tekst);
        })
}

/**/
/*Funktion til at style anden leverings valgt eller ej samt sætte variablen til at gennemskue om anden levering er valgt eller ej (variabel er global og bruges i andre funktioner men sættes altid herfra)*/
/**/
function showDeliveryContent() {
    let delivery_checkbox = document.getElementById('anden-levering-knap');
    let delivery_content = document.getElementById('anden-levering-wrapper');
    let delivery_tekst = document.getElementById('anden-levering-tekst');

    if (delivery_content_shown == false) {
        delivery_content.style.display = "block";
        delivery_checkbox.innerHTML = "X";
        delivery_tekst.style.bottom = "0px";
        delivery_content_shown = true;
    } else {
        delivery_content.style.display = "none";
        delivery_checkbox.innerHTML = "";
        delivery_tekst.style.bottom = "10px";
        delivery_content_shown = false;
    }
}