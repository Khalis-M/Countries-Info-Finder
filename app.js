let countryInput = document.getElementById("countryInput");
let searchButton = document.getElementById("searchButton");
let randomButton = document.getElementById("randomButton");
let resultScreen = document.getElementById("resultScreen");

const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Australia",
    "Japan",
    "China",
    "Brazil",
    "India",
    "South Korea",
    "Mexico",
    "Russia",
    "Saudi Arabia",
    "Argentina",
    "Switzerland",
    "Sweden",
    "Netherlands",
    "Norway",
    "Denmark",
    "New Zealand",
    "Singapore",
    "United Arab Emirates",
  ];

searchButton.addEventListener("click", () => {
    let countryName = countryInput.value
    if (countryName) displayCountry();
});

randomButton.addEventListener("click", () => {
    displayCountry();
});

displayCountry = () => {
    let countryName = countryInput.value
    if (!countryName) countryName = countries[Math.floor(Math.random()*countries.length)];
    let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        resultScreen.innerHTML = `
        <img src="${data[0].flags.svg}" id="flag">
        <h2>${data[0].name.common}</h2>
        <div class="data">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
        </div>
        <div class="data">
                <h4>Region:</h4>
                <span>${data[0].subregion}</span>
        </div>
         <div class="data">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
        </div>
        <div class="data">
                <h4>Area:</h4>
                <span>${data[0].area} m²</span>
        </div>
        <div class="data">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                }  ${data[0].currencies[Object.keys(data[0].currencies)].symbol}</span>
        </div>
         <div class="data">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
        </div>
        <div class="data">
            <h4>Country code:</h4>
            <span>${data[0].tld[0]}</span>
    </div>
      `;
    })
    .catch(() => {     
        resultScreen.innerHTML = `<h3>Invalid country name.</h3>`;
    });
    countryInput.value = "";
};
