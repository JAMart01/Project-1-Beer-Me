console.log("js.js linked");



















































































































































































































































































































































































































































































































var closeW = document.getElementById("noBtn");



closeW.addEventListener("click", function(e){
    e.preventDefault();
    countdown_init();

});



var countdown;
var countdown_number;
   
    function countdown_init() {
        countdown_number = 6;
        countdown_trigger();
    }
   
    function countdown_trigger() {
        if (countdown_number > 0) {
            countdown_number--;
   
            document.getElementById('countdown').innerHTML = "Time: " + countdown_number;
   
            if(countdown_number > 0) {
                countdown = setTimeout('countdown_trigger()', 1000);
            }else{
                // window.location.href = "thanks.html";
                alert("xxx")
            }
        }
    }







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































var formEl = document.querySelector("#brew-form");
var responseContainerEl = document.querySelector("#responsive-container");

var brewFormHandler = function(event) {
    event.preventDefault();
    var brewURL = "https://api.openbrewerydb.org/breweries?" //by_type=brewpub&by_page=10&by_dist=
    var geoURL = "http://www.mapquestapi.com/geocoding/v1/address?key=i59AhjaYZTQaOPj86iKkHTeoACIvMK7I&location="
    var addressInput = document.querySelector("input[name='address']").value;
    var cityInput = document.querySelector("input[name='city']").value;
    var stateInput = document.querySelector("select[name='state']").value;
    var breweryTypeInput = document.querySelector("select[name='brewery-type']").value;
    var listLengthInput = document.querySelector("input[name='list-length']").value;


    if (!addressInput || !cityInput || !stateInput) {
        alert("You need to fill out the address form!");
        return false;
    }
    
    if (listLengthInput && (listLengthInput < 1 || listLengthInput > 50)) {
        alert("You need to enter a number between 1 and 50!");
        return false;
    }

    formEl.reset();

    var newSearch = formEl.hasAttribute("search-id");

    if (newSearch) {
        responseContainerEl.innerHTML = "";
    }

    geoURL += addressInput + "," + cityInput + "," + stateInput;

    if (listLengthInput) {
        brewURL += "per_page=" + listLengthInput;
    } else {
        brewURL += "per_page=10";
    }

    if (breweryTypeInput && breweryTypeInput != "") {
        brewURL += "&by_type=" + breweryTypeInput;
    }
    
    brewFetch(geoURL,brewURL);

};


var brewFetch = function(gurl,burl){
    formEl.setAttribute("search-id","true");

    fetch(gurl)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            var lat = JSON.stringify(response.results[0].locations[0].latLng.lat);

            var lng = JSON.stringify(response.results[0].locations[0].latLng.lng);

            burl += "&by_dist=" + lat + "," + lng;

            fetch(burl)
                .then(function(response){
                    return response.json();
                })
                .then(function(response){
                    var breweries = [];

                    for (var i = 0 ; i < response.length ; i++) {
                        breweries[i] = [];

                        breweries[i][0] = document.createElement("h3");

                        breweries[i][0].textContent = response[i].name;

                        breweries[i][1] = document.createElement("p");

                        breweries[i][1].textContent = response[i].brewery_type.toUpperCase();
                        
                        breweries[i][2] = document.createElement("p");
                        
                        breweries[i][2].textContent = response[i].street + ", " + response[i].city + ", " + response[i].state + " " + response[i].postal_code;

                        responseContainerEl.appendChild(breweries[i][0]);
                        
                        responseContainerEl.appendChild(breweries[i][1]);

                        responseContainerEl.appendChild(breweries[i][2]);
                    }
                
                })
        })

};

var load = function() {
    fetch(geoURL)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);

            console.log(response.results[0].locations[0].latLng);

            var lat = JSON.stringify(response.results[0].locations[0].latLng.lat);

            var lng = JSON.stringify(response.results[0].locations[0].latLng.lng);

            console.log(lat,lng);

            brewURL = brewURL +lat+","+lng ;

            console.log(brewURL);

            fetch(brewURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(response){
                    console.log(response);

                    var breweries = [];

                    for (var i = 0 ; i < response.length ; i++) {
                        breweries[i] = [];

                        breweries[i][0] = document.createElement("h3");

                        breweries[i][0].textContent = response[i].name;

                        breweries[i][1] = document.createElement("p");

                        breweries[i][1].textContent = response[i].brewery_type.toUpperCase();
                        
                        breweries[i][2] = document.createElement("p");
                        
                        breweries[i][2].textContent = response[i].street + ", " + response[i].city + ", " + response[i].state + " " + response[i].postal_code;

                        responseContainerEl.appendChild(breweries[i][0]);
                        
                        responseContainerEl.appendChild(breweries[i][1]);

                        responseContainerEl.appendChild(breweries[i][2]);
                    }
                
                })

        })

};

// load();

formEl.addEventListener("submit", brewFormHandler);















