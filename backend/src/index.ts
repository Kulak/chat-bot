import * as express from "express"
import * as http from "http"
import * as bodyParser from 'body-parser'
import * as fs from 'fs'

const app = express();
app.on('error', (err) => {
    console.error("Error: ", err)
})
const server = http.createServer(app);

app.use(bodyParser.json())
/* 
 * Allow CORS, production system needs to be restricted to proper domain names.
 * General CORS info:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * 
 * This allows webbrowser to send request that was served by another domain.
 * For ExpressJS:
 * https://enable-cors.org/server_expressjs.html
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    //res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", 
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
});

/* configure routes */ 
app.get('/', (request: express.Request, response: express.Response) => {
    response.send('This application service API requests and not the web files.');
})
app.get('/AlmeAPI/api/Configuration/GetConfiguration', (req: express.Request, res: express.Response) => {
    fs.readFile('data/configuration.json', (err, contents) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(contents)
    })
})
app.get('/AlmeAPI/api/Configuration/GetConfiguration', (req: express.Request, res: express.Response) => {
    fs.readFile('data/configuration.json', (err, content) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(content)
    })
})
app.post('/AlmeAPI/api/Conversation/AppEvent', (req: express.Request, res: express.Response) => {
    fs.readFile('data/appEvent.json', (err, content) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(content)
    })
})

server.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on ${JSON.stringify(server.address())}`)
})
