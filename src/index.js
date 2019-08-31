const querystring = require('querystring')

exports.handler = (event, context, callback) => {
  if (!event.body || typeof event.body !== 'string') {
    callback(null, {
      "statusCode": 400,
      "body": JSON.stringify(`Incorrect payload: ${event.body}`)
    })
  }

  try {
    const payload = querystring.parse(event.body)

    console.log(payload.command)
    console.log(payload.user_name)
    console.log(payload.text)

    // handle `/eyes start`
    callback(null, {
      "statusCode": 200,
      "body": JSON.stringify("Hello, World!")
    })

    // handle `/eyes :celebrity`
  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`)
  }
}