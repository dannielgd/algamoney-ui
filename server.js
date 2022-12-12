const express = require('express');
const app = express();
const projectName = 'algamoney-ui'

app.use(express.static(__dirname + '/dist/' + projectName));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PROD || 4200);
