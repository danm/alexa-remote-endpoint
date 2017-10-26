const Remote = require('new-samsung-remote');
const express = require('express')

const app = express()

const config = {
  ip_address: process.argv[2],
  name: "New Samsung Remote"
};      

const remote = Remote(config);

const send = async (key) => {
  return new Promise(async (resolve, reject) => {
    remote.sendKey(key, (err, res) => {
      resolve();
    });
  });
};

app.get('/volup', async (req, res) => {
  await send('KEY_VOLUP');
  await send('KEY_VOLUP');
  await send('KEY_VOLUP');
  res.send('ok');
});

app.get('/voldown', async (req, res) => {
  await send('KEY_VOLDOWN');
  await send('KEY_VOLDOWN');
  await send('KEY_VOLDOWN');
  res.send('ok');
});

app.get('/remote/:key', function (req, res) {  
  res.send('Hello World!');
  send(`KEY_${req.params.key}`);
});

app.listen(process.argv[3] || 3000, function () {
  console.log(`Remote listening on port ${process.argv[3]} speaking to device ${process.argv[2]}!`)
});