/**
 * @license The MIT License (MIT)             - [https://github.com/subversivo58/subversivo58.github.io/blob/master/LICENSE]
 * @copyright Copyright (c) 2019 Lauro Moraes - [https://github.com/subversivo58]
 * @version 0.1.0 [development stage]         - [https://github.com/subversivo58/subversivo58.github.io/blob/master/VERSIONING.md]
 */
 
const uWS = require('uWebSockets.js')
const NTPClient = require('@destinationstransfers/ntp')

// `proccess.env` return `{String}`. Listen server requiries `{Number}` type for "port" parameter of server
const PORT = Number(process.env.PORT) || 3000

const app = uWS.App()

app.get('/time', (res, req) => {
    //
    try {
        NTPClient.getNetworkTime().then(date => {
            res.writeStatus('200 OK')
            res.end(JSON.stringify({
                time: date
            })
        }).catch(e => {
            res.writeStatus('402 Unprocessable Entity')
            res.end(JSON.stringify({
                error: e.message
            })
        })
    } catch(ex) {
        res.writeStatus('402 Unprocessable Entity')
        res.end(JSON.stringify({
            error: ex.message
        })
    }
})

app.any('/*', (res, req) => {
    res.writeStatus('302 Temporary Redirect')
    res.writeHeader('X-Frame-Options', 'DENY')
    res.writeHeader('Location', 'https://github.com/subversivo58/')
    res.end()
})

// start server
app.listen(PORT, (token) => {
    if ( token ) {
        console.log('Runing on port: ' + PORT)
    } else {
        console.log('Failed to listen to port ' + PORT)
    }
})
