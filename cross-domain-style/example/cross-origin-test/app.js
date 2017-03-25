var express = require('express')

var app = new express()

app.use('/', express.static('./static'))

var port = 8999
app.listen(port, function() {
    console.log('http://localhost:%s', 8999)
})