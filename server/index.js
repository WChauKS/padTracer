// node index.js ####
// npm run dev

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// const io = require('socket.io');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
// var readline = require('readline');
// const { RSA_X931_PADDING } = require('constants');

app.set('port', process.argv[2] || 3000);
app.use(express.static(path.join(__dirname, '../app')));
app.use(require('./js/routes.js'));

// prints server start message to server console
app.listen(app.get('port'), function() {
    console.log(
        'Express started on http://localhost:' +
        app.get('port') +
        '; press Ctrl-C to terminate.'
    );
});
