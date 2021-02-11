const request = require('request')

const geocode = (address, callback) => {
   
    // For Geocoding
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmF0aWh0aGViYWNoIiwiYSI6ImNra3ZyNXhtejA5anAycW80NjZxODVxNXcifQ.F9NYm8FMPsWxsMcOuAyZJQ`

    request({url, json: true}, (err,  { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location, try again.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[1].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode