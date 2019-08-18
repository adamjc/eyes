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

