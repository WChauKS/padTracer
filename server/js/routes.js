var express = require('express');
var router = express.Router();

// Home page
router.get('/', function (req, res) {
    res.sendFile('index.html');
});

router.post('/path', function(req, res) {
    var dragPath = processOrbs(req.body.dragPath);
    console.log(dragPath);
});

// Other Error
router.use(function(req, res) {
    res.status(404);
    res.end('<h1>Error: 400</h1>')
});

// Server Side Error
router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.end('<h1>Error: 500</h1>')
});

module.exports = router;