"use strict";
/* SOME CONSTANTS */
let endpoint01 = "https://misdemo.temple.edu/auth";
localStorage.usertoken = 0;
localStorage.lastnavlink = "";
let endpoint02 = "https://mis3502-islam.com/8211";
localStorage.usertoken = 0;
localStorage.lastnavlink = "";

/* SUPPORTING FUNCTIONS */

let navigationControl = function(the_link) {
    /* manage the content that is displayed */

    let idToShow = $(the_link).attr("href");
    localStorage.lastnavlink = idToShow;
    console.log(idToShow);

    if (idToShow == "#div-login") {
        /* what happens if the login/logout link is clicked? */
        localStorage.usertoken = 0;
        $(".secured").addClass("locked");
        $(".secured").removeClass("unlocked");
    }

    $(".content-wrapper").hide(); /* hide all content-wrappers */
    $(idToShow).show(); /* show the chosen content wrapper */
    $("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
    $(".navbar-collapse").collapse(
        "hide"
    ); /* explicitly collapse the navigation menu */
};

/* end navigation control */

//call this function when the login button is clicked

let loginController = function() {
    //go get the data off the login form
    let the_serialized_data = $("#form-login").serialize();
    //the data I am sending
    console.log(the_serialized_data);
    let url = endpoint01;
    $.getJSON(url, the_serialized_data, function(data) {
        //the data I got back
        console.log(data);
        if (typeof data === "string") {
            localStorage.usertoken = 0; // login failed.  Set usertoken to it's initial value.
            $("#login_message").html(data);
            $("#login_message").show();
        } else {
            $("#login_message").html("");
            $("#login_message").hide();
            localStorage.usertoken = data["user_id"]; //login succeeded.  Set usertoken.
            $("#usertoken").val("");
            $("#usertoken").val(data["user_id"]);
            $(".secured").removeClass("locked");
            $(".secured").addClass("unlocked");
            $("#div-login").hide();
            $("#dDiv").show();
            $("#usertoken").hide();
            $("#choice").hide();
        }
    });
    //scroll to top of page
    $("html, body").animate({ scrollTop: "0px" });
};

//document ready section
$(document).ready(function() {
    /* ------------------  basic navigation ----------------*/
    /* lock all secured content */
    $(".secured").removeClass("unlocked");
    $(".secured").addClass("locked");
    /* this reveals the default page */
    $("#div-login").show();
    /* this controls navigation - show / hide pages as needed */
    /* what to do when a navigation link is clicked */
    $(".nav-link").click(function() {
        navigationControl(this);
    });

    /* what happens if the login button is clicked? */
    $("#btnLogin").click(function() {
        loginController();
    });


// ---------------------------------------------------------------------------------------------------------------------------------------------------------
//WEATHER API CALL
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
var currentDate = today;

const searchWeather = document.querySelector("#weatherbox");
let query = "";
const resultsdiv = document.querySelector("#result-4-weather");
const apiKey = "c819148a640aadac2f21e5c6afd21133";
searchWeather.addEventListener("submit", (e) => {
    e.preventDefault();
    query = e.target.querySelector("input").value;
    OpenWeatherAPI();
});
async function OpenWeatherAPI() {
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`;
    const response = await fetch(baseURL);
    const data = await response.json();
    const responseObj = data.weather;
    let w_icon = "";
    let desc = "";

    responseObj.map((result) => {
        w_icon = result.icon;
        desc = result.description;
    });
    const humid = data.main["humidity"];
    const windy = data.wind["speed"];
    const cty_name = data.name;
    const cnty_name = data.sys["country"];
    let temp = Math.round(data.main["temp"]);
    let fhr = Math.round((data.main["temp"] - 32) * (5/9));
    const id = data["id"];

    inserttoHTML(
        id,
        cnty_name,
        cty_name,
        windy,
        temp,
        desc,
        w_icon,
        humid,
        fhr
    );
}

function inserttoHTML(
    id,
    cnty_name,
    cty_name,
    windy,
    temp,
    desc,
    w_icon,
    humid,
    fhr
) {
    let wHTML = "";
    wHTML += ` 
    <div class="content_wrapper" id="app">
    <div class='infos' data-id="${id}">
  <h1>Current Weather</h1>
            <div class="date">Date:  &nbsp; ${currentDate} </div>
        <div class="weather_card">
            <div class="weather_card_img" :style="{backgroundImage: weatherImg}">
                <div class="weather_card_state">
                    <span class="material-icons">
                   <img src="http://openweathermap.org/img/w/${w_icon}.png" alt="img">
                    </span>
                </div>
            </div>

            <div class="weather_card_infos">
                <div class="weather_card_infos_title">
                ${cty_name}
                </div>
                <div class="weather_card_infos_country">
                ${cnty_name}
                </div>
                <div class="weather_card_infos_desc">
               There is a ${desc}
                </div>
                <div class="weather_card_infos_temp">
                ${fhr}°C / ${temp}°F
                </div>
                <div class="bottom">
                    <hr>
                    <div class="weather_card_infos_bottom">
                        Humidity:     ${humid}% - Wind Speed: ${windy} km/h
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    resultsdiv.innerHTML = wHTML;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------
//DICTIONARY API CALL
// ---------------------------------------------------------------------------------------------------------------------------------------------------------


const searchword = document.querySelector("#dictionbox");
let category = "";
const wordiv = document.querySelector("#worddiv");
searchword.addEventListener("submit", (e) => {
    e.preventDefault();
    category = e.target.querySelector("input").value;
    quotesAPI();
});



async function quotesAPI() {

    const baseURL = `https://api.quotable.io/random?tags=life,famous-quotes`;
    const response = await fetch(baseURL);
    const data = await response.json();

let author = data['author']
let quote = data['content']

           
inserttoHTML(
    author,
quote

);


function inserttoHTML(
    author, quote
) {
    let wHTML = "";
    wHTML += ` 
    <div class="word">
    <h3>"${quote}"</h3>
 
  </div>
  <div class="details">
    <p>QUOTE BY: ${author}</p>
  </div>
  <p class="word-meaning">

  </p>
  <p class="word-example"></p>
    `;
    wordiv.innerHTML = wHTML;
}

              

  





  



}


})
