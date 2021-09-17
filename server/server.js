const app = require('./app')
const planetCode = require('./planetCode')
const http = require('http')
const port = process.env.PORT || 80
app.listen(port, '45.95.202.16', () => {
    console.log(`Server started ${port}`)
})