const express = require("express");
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "885eb39e5f254525b7d2c9fe2d156e97"; // Your client id
var client_secret = "a9087dc6606a4ab692a0b3a528538560"; // Your secret
var redirect_uri = "http://localhost:8888/callback";
const sessions = {};

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app.use(cors()).use(cookieParser());

app.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token,
          userProfile = null;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        const sessionIdentifier = generateRandomString(16);

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          if (error) {
            console.log(error);
          } else {
            userProfile = body;

            sessions[sessionIdentifier] = {
              access_token: access_token,
              refresh_token: refresh_token,
              user_profile: userProfile,
            };
          }
          res.redirect(
            `http://localhost:4200/processing?session=${sessionIdentifier}`
          );
        });
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});
// Inside your backend API route
app.get("/get-tokens", (req, res) => {
  const sessionIdentifier = req.query.session;

  if (sessionIdentifier && sessions[sessionIdentifier]) {
    const userObj = sessions[sessionIdentifier];
    res.json(userObj);
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});

app.listen(8888, () => {
  console.log("Server listening on port 8888");
});
