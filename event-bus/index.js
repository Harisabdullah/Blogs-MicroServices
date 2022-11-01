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

  try{
    await axios.post('http://posts-srv:4000/events', event);
    await axios.post('http://comments-srv:4001/events', event);
    await axios.post('http://query-srv:4002/events', event);
    await axios.post('http://moderation-srv:4003/events', event);

  } catch (e){
    console.log("error echoing events");
  }

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, ()=> {
  console.log('Event-bus Listening on Port: 4005');
})

