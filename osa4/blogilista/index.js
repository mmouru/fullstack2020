const http = require('http')
const app = require('./App')

const server = http.createServer(app)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
