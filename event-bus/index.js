const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;

  events.push(event);

  console.log('echoing: ', event.type);
  console.log('Data:', event.data);

  await axios.post('http://posts-srv:4000/events', event).catch(e=>{
    console.log("Post service not listening") });
  await axios.post('http://comments-srv:4001/events', event).catch(e=>{
    console.log("Coomments service not listening") });;
  await axios.post('http://query-srv:4002/events', event).catch(e=>{
    console.log("Query service not listening") });;
  await axios.post('http://moderation-srv:4003/events', event).catch(e=>{
    console.log("Moderation service not listening") });;

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, ()=> {
  console.log('Event-bus Listening on Port: 4005');
})

