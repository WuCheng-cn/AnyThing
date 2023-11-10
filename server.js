import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const express = require('express')
const fs = require('fs')
const http = require('http')
const app = express()
app.use(express.static('./dist'))
app.use(function (req, res, next) {
  res.sendfile('./dist/index.html')  
})  
const httpsServer = http.createServer(app)
httpsServer.listen(8066, function () {
  const port = httpsServer.address().port
  console.log('app listening at http://localhost:%s', port)
})
