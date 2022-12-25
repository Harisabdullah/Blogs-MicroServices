const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const handleEvent = async (type, data) => {
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }
}

app.post('/events', async (req, res) => {
  const {type, data} = req.body;

  await handleEvent(type, data);
  res.send({});
});

app.listen(4003, async () => {
  console.log('Moderation Service Listening on 4003');

  const res = await axios.get('http://event-bus-srv:4005/events').catch(e=>{
    console.log("Unable to get upto speed. will try again");
  });

  for (let event of res.data) {
    console.log('Processing missed event: ', event.type);
    await handleEvent(event.type, event.data);
  }
  console.log("Up to date");
  console.log("Hello");
});