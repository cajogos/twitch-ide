const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) =>
{
    console.log(req.url);
    switch (req.url)
    {
        case '/':
            res.writeHead(200, { 'content-type': 'text/html' })
            fs.createReadStream('public/index.html').pipe(res)
            break;
        case '/dist/main.js':
            res.writeHead(200, { 'content-type': 'application/javascript' })
            fs.createReadStream('dist/main.js').pipe(res)
            break;
    }
});

server.listen(process.env.PORT || 3000)
console.log('Server running...');