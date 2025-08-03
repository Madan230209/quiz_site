var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "professor name",
    college: "XYZ University",
    tech: ["JavaScript", "React", "Express"]
  });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

//database related task


  res.send({
    id: id,
    name: "Professor ",
    subject: "Computer Science",
  });
});

module.exports = router;
