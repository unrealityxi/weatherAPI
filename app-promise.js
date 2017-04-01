const yargs = require("yargs");
const axios = require("axios");

// config yargs
const argv = yargs
    .options({
        a: {
            demands: true,
            alias: "address",
            describe: "address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
    if (response.data.status ==="ZERO_RESULTS"){
        throw new Error("Unable to find that address");
    }

    const key = "8c727caf6986d2ec011d65331644a320";
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);


}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}`);
})

.catch((e) => {
    if (e.code === "ENOTFOUND"){
        CONSOLE.LOG("Unable to connect to API servers.");
    } else {
        console.log(e.message);
    }
});