var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(burger_data) {
    console.log(burger_data);
    res.render("index", { burger_data });
  });
});

router.put("/burgers/update", function(req, res) {
  burger.update(req.body.burger_id, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

router.post("/burgers/create", function(req, res) {
  burger.create(req.body.burger_name, function(result) {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
// router.post("/api/burgers", function(req, res) {
//   burger.create(
//     ["burger_name", "devoured"],
//     [req.body.burger_name, req.body.devoured],
//     function(result) {
//       // Send back the ID of the new quote
//       res.json({ id: result.insertId });
//     }
//   );
// });

// router.put("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
