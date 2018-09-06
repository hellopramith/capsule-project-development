const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:4b9830d2-44d5-464b-8a84-225ed473b5ba',
  key: 'c77f1540-82fa-4d36-9a6e-3c6fa25788e2:CMLQzqBohxdsz2qDexQWeqylSe5toR0GwySWIlBID10=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
  .createUser({ 
  id: username, 
  name: username 
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
    if (error.error_type === 'services/chatkit/user_already_exists') {
      res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
