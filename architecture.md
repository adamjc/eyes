
# Architecture?

Initially manually curated list of 250 images, cropped to include eyes. Possible structure is:

```
{
  "name": "Chaka Khan",
  "full-image": blob,
  "eyes-image": blob
}
```

Storing this in a document-store database (e.g. Dynamo DB, Mongo, Redis, etc).

The potential downside with this approach is that this way we will be manually sending the image data with the html (i.e. `<img src="data:image/png;base64, base64blob">`), which is a heavier cost for the server, and will lead to serving up images about 25% larger than we otherwise would, for a 100Kb image, we would be sending 125Kb of data.

A different approach would be to store the images in a public bucket, then fronted by a CDN. If we label our image data correctly, we should be able to link directly to these images (i.e. `<img src="path-to-bucket/celebrity-name/eyes.png">`). The challenge with this approach is how to store the list of celebrities stored? We again could use a document store, and just store the name, given that the paths we construct should be easy enough to craft in the web page generator (server or lambda)

The architecture _could_ look like:

### Image Fetch

`Client <- CloudFront (https://eyesgame.xyz) (+ WAF if needed) <- S3`

### Slack Integration

`Slack <- APIGateway (https://slack.eyesgame.xyz) <- Lambda (Generates slack response) <- DynamoDB (List of celebrities)`

Would need to investigate OAuth to work with slack.

