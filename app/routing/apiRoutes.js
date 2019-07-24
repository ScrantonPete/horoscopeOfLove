// importing friends array from friend.js file

var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends from friends.js file as a JSON object
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Receive current user profile name, photo, sign, and scores
    var user = req.body;

    // ensure score is treated as integers
    for (var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // setting bestMatch to be 0 if there is no difference or maximum difference is 4 * 10
    var bestMatch = 0;
    var maximumDifference = 40;

    // loop to calculate the total difference in scores
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // keep track of the current best match and what their score differences are
      if (totalDifference < maximumDifference) {
        bestMatch = i;
        maximumDifference = totalDifference;
      }
    }

    // add current user to friend array
    friends.push(user);

    // display best match
    res.json(friends[bestMatch]);
  });
};
