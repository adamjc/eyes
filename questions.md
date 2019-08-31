# How do we maintain state for the games?
/eyes will invoke a game for a channel if no game is currently in progress for that channel.
We can store the game as a hash from some of the other persistent data.

A game could look like:

"500d247...": {
  "creationDate": 1566159745731
  "celebrity": {
    "name": "Arnold Schwarzenegger",
    // this gets translated to: https://eyesgame.s3-eu-west-1.amazonaws.com/arnold-schwarzenegger
    "image-key": "arnold-schwarzenegger"
  }
}

# How do we handle timers?

a game will consist of some time between 1 - 5 minutes, we need to be able to handle this in a lambda. We could use a `setTimeout` to last for the defined period of the game:

```
function startGame (minutes) {
  setTimeout(() => {
    // game is up, we do some checks here to see if the game has ended or not, if it has we just end
  }, minutes * 60)
}
```

# What does the payload from Slack look like?

body: "token=TcRE9uwWXFPvTj1AfYqTDVm5&team_id=TKWG74GBC&team_domain=laputanmachineexe&channel_id=CL7UCMPLG&channel_name=general&user_id=ULA38FX5L&user_name=adamjc86&command=%2Feyes&text=&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FTKWG74GBC%2F744913246432%2FBSihGdSvO257FKarQzj9CT9e&trigger_id=744917323621.676551152386.de20cee7b06b5fe19fb420881db758fb"

turned into an object:

{
  "token": "some string",
  "team_id": "some string",
  "team_domain": "slack workspace name",
  "channel_id": "channel id",
  "channel_name": "general",
  "command": "eyes",
  "text": "",
  "response_url": "the url to respond to",
  "user_name": "person who sent the command"
}

