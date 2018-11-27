const bodyParser = require('body-parser')
var connectWebhook = function(app)
{
app.use(bodyParser.json())

const REQUIRE_AUTH = true
const AUTH_TOKEN = '4efec7cafaf24ce098001d038606e132'

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
  if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
      return res.status(401).send('Unauthorized')
    }
  }

  // and some validation too
  if (!req.body || !req.body.queryResult || !req.body.queryResult.parameters) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.queryResult.action)

  // parameters are stored in req.body.result.parameters
  var userName = req.body.queryResult.parameters['given-name']
  var webhookReply = 'Hi ' + userName + '! Welcome from the webhook.'

  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})
};

module.exports = {connectWebhook}
