const yargs = require("yargs");
const request = require("request");

const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");

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


// Callback version of fetch weather data.
geocode.geocodeAddress(argv.address, function(errorMessage, results){
    if (errorMessage){
        return console.log(errorMessage);
    } 

    console.log(results.address);

    weather.getWeather(results.latitude, results.longitude, (err, weatherRes) => {
        if (err) {
            return console.log(err);
        }
        return console.log(`Current temperature is ${weatherRes.currentTemperature}. It feels like ${weatherRes.realFeel}`);

    });
}); 



