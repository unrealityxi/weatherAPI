const request = require("request");

// Finds geocode location based on address
function geocodeAddress(address, callback){
    
    // Makes address url friendly
    var encodedAddress = encodeURIComponent(address);

    // requests data from
    request({
        // url with encoded address
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true,
    }, (error, response, body) => {

        // If something fails
        if (error){
            return callback("Failed to connect to google server");
        } 
        // If location wasnt found
        else if (body.status === "ZERO_RESULTS") {
            return callback("Unable to find that address.");
        } 
        // if something generaly fails in googles api
        else if (body.status != "OK"){
            return console.log("Something failed, and we are all doomed");
        }

        var res = body.results[0];
        var coords = res.geometry.location;

        // execute callback with address, lat and lng obj
        callback(undefined, {
            address: res.formatted_address,
            latitude: coords.lat,
            longitude: coords.lng
        })
    })
}

module.exports = {
    geocodeAddress
}