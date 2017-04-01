const request = require("request");

// my own API key.
const key = "8c727caf6986d2ec011d65331644a320";

function getWeather(lat, long, cbck){
    // weather req url:
    var url = `https://api.darksky.net/forecast/${key}/${lat},${long}`;

    // request data
    request({url, 
            json: true
        }, 
        function(err, res, body){
            // in case of error   
            if (err){
                return cbck("error: Failed to connect to weather server");
            }
            // if weather data for the location not found
            else if (res.statusCode == 404){
                return cbck("error: Failed to fetch weather data");
            }
            // if something else fails.
            else if (res.statusCode != 200){
                return cbck("Something went awry, unable to complete request");
            }

            // If everything goes well, call calback with no error and temperature data object
            // as second argument
            return cbck(undefined, {
                currentTemperature : body.currently.temperature,
                realFeel: body.currently.apparentTemperature

            });
            
        });
}

module.exports = {
    getWeather
}