const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());



app.post('/events', async (req, res) => {
  const event = req.body;

  console.log('echoing ...');

  try{
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);

  } catch (e){
    console.log("error echoing events");
  }


  res.send({ status: 'OK' });
})

app.listen(4005, ()=> {
  console.log('Event-bus Listening on Port: 4005');
})

