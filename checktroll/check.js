var FBMessenger = require('fb-messenger')
var messenger = new FBMessenger("EAAbHXRREfRsBAHZBSrUVZARC7TnaUXpZBmX4PrxDDZAT2xXLRcbGscZCvrzS6lA0lZBCJbKp3N6IimStITNui7dJXg4FYh4cguvQMevgudVCPYVZB90KU9iLZAaoI5c4OOruQFXZBWyFACwirNbRZBsuzthXcST5irwCPTDaPtNSYEFQZDZD")

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Who is that bitch id?  ", function(answer) {
     console.log("i send messenger to " + answer);
     messenger.sendTextMessage(answer,"安安")
     rl.close();
})
