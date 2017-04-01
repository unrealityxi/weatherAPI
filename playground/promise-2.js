const request = require("request");

var geocodeAddress = function(address) {
    return new Promise((resolve, reject) => {
       
        var encodedAddress = encodeURIComponent(address);
        console.log(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true,
        }, (error, response, body) => {
            if (error){
                reject("Failed to connect to google server");
            } 
            else if (body.status === "ZERO_RESULTS") {
                reject("Unable to find that address.");
            } 
            else if (body.status != "OK"){
                reject("Something failed, and we are all doomed");
            }

            var res = body.results[0];
            var coords = res.geometry.location;
            return resolve({
                address: res.formatted_address,
                latitude: coords.lat,
                longitude: coords.lng
            });
        });
    });

}

geocodeAddress("tovariševo").then((resp) => {
    console.log(JSON.stringify(resp, undefined, 2));
}).catch((err) => console.log(err));