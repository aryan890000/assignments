const request = require('supertest');
const assert = require('assert');
const express = require('express');
const { error } = require('console');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second
let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.use( (req, res, next)=> {
   // Extract the user ID from the headers
  const user_id = req.headers['user-id'];

  if(!user_id){
    return res.status(404).json({error :  "user id is required"});
  }
   // Initialize the count for the user if not present
   if(!numberOfRequestsForUser[user_id]){
    numberOfRequestsForUser[user_id] = 0;
   }
    // Increment the request count for the user
    numberOfRequestsForUser[user_id]++;

     // Check if the user has exceeded the request limit
     if (numberOfRequestsForUser[user_id] > 5) {
      return res.status(404).json({ error: 'Rate limit exceeded' });
       }
  // Allow the request to proceed
  next();
})
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});
app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});
module.exports = app;