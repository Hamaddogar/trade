let router = require("express").Router();
let api = require("../api/supplier");
// const supplier = require('../db/models/supplier');

router.post("/create", (req, res) => {
  //   console.log("Suppler", req.body);
  api.createSupplier(req.body, (err, supplier) => {
    // supplier.populate('company', () => {

    if (err) {
      res.status(500).json(err);
    } else {
        console.log(supplier)
      res.json(supplier);
    }

    // });
  });
});
module.exports = router;
