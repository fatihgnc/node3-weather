const request = require('request');

const forecast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=92a490f4c6e049d2b1f8c6a5e60784a0&query=${lat},${long}`

    request({url, json: true}, (err, { body }) => {
        if(err) {
            callback('Unable to connect to services!', undefined)
        } else if('error' in body) {
            callback('Unable to find the location, make sure you entered the correct input!', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain. Wind speed is ' + body.current.wind_speed + ' from ' + body.current.wind_dir) + '.'
        }
        // console.log(body)
    })
}


module.exports = forecast