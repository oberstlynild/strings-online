/**/
/*Demo at et fetch*/
/**/

//Funktionen er kørt med et klik på siden som giver et items ID med som ARGUMENT!
function fetchItem(id) { //Funktionens navn samt funktionens PARAMETER!
    let bearer_token = sessionStorage.getItem('bearer'); //Henter autorization ned fra sessionStorage
    let formData = new FormData(); //Opretter variabel til det body der skal med fetch
    formData.append('field', field_name); //Fortæller hvilket felt i API jeg vil opdatere og tilføjer til body
    formData.append('field_value' field_value); //Fortæller hvad jeg vil opdatere feltet med og tilføjer til body
    fetch('https://url.url/item/' + id, { //Fetcher en valgt URL - i dette tilfælde en url med et item vi vil opdatere en enkelt linje på
            method: "PATCH", //Vi opdatere en ENKELT linje! POST (create), GET (read), PUT (update), DELETE (delete), PATCH (update single line)
            headers: { //Sender min Bearer Token med som 'login' til at jeg må benytte APIen
                'Authorization': "Bearer " + bearer_token
            },
            body: formData, //Tilføjer min body til fetch (new FormData() er multipart/form-data)
        })
        .then(response => response.json()) //Laver data om til json data
        .then(function (data) { //Starter function med data fra min fetch 
            console.log(data) //Logger dataen i browser consol
        })
}

