/**
 * @license The MIT License (MIT)             - [https://github.com/subversivo58/subversivo58.github.io/blob/master/LICENSE]
 * @copyright Copyright (c) 2019 Lauro Moraes - [https://github.com/subversivo58]
 * @version 0.1.0 [development stage]         - [https://github.com/subversivo58/subversivo58.github.io/blob/master/VERSIONING.md]
 */
 
const http = require('http')
const ntp = require('ntp2')
// `proccess.env` return `{String}`. Listen server requiries `{Number}` type for "port" parameter of server
const PORT = Number(process.env.PORT) || 3000
const server = http.createServer((req, res) => {
    // handler
    if ( req.url === '/time' && req.method === 'GET' ) {
        // for development ... use as "wildcard" if no match "origin"
        let hostname = ('origin' in req.headers && req.headers['origin'] !== null) ? req.headers['origin'] : '*'
        res.setHeader('Access-Control-Allow-Origin', hostname)
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')

        let ErrorRequest = message => {
            res.writeHeader('500', 'Internal Server Error', {
                'Content-Type': 'application/json; charset=utf-8'
            })
            res.end(JSON.stringify({
                error: message
            }))
        }

        try {
            ntp.time({server: 'time.google.com'}, (err, response) => {
                if ( err ) {
                    ErrorRequest(err)
                } else {
                    res.writeHeader('200', 'OK', {
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                    res.end(JSON.stringify({
                        time: response.time
                    }))
                }
            })
        } catch(ex) {
            ErrorRequest(ex.message)
        }
    } else if ( req.url === '/favicon.ico' && req.method === 'GET' ) {
        res.writeHead('200', 'OK', {
            'Content-Type': 'image/x-icon'
        })
        res.end()
    } else {
        res.writeHeader('302', 'Temporary Redirect', {
            'X-Frame-Options': 'DENY',
            'Location': 'https://github.com/subversivo58/'
        })
        res.end()
    }
})

// start server
server.listen({port: PORT}, () => {
    console.log('Runing on port: ' + PORT)
})
