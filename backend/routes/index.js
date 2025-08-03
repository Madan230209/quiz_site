var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET new page. */
router.get('/testing', function(req, res, next) {
  res.json({
    name: "John Wick",
    age: 35,
    tech: ["JavaScript", "Node.js", "Express"],
    isActive: true,
    address: {
      street: "123 Main St",
      city: "New York",
      zip: "10001"
    },
    skills: [
      { name: "JavaScript", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
      { name: "Express", level: "Beginner" }
    ]
  })
});

module.exports = router;
